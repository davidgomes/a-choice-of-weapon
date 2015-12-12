var songBreakpoints = [23, 56, 122, 145];

function PlayState() {
  this.setup = function () {
    this.floorLevel = 400;
    this.enemySize = { width: 32, height: 32 };
    this.enemies = new penta.SpriteList();
    this.player = { canShoot: true, score: 0, bullets: 1000 }; // 1000
    this.bulletSprite = new penta.Sprite('assets/bullet.png', 10, 20);
    this.canAccept = false;

    document.getElementById('canvas').style = 'cursor: none;';
    
    document.getElementById('music').currentTime = 0;
    document.getElementById('music').play();
  };

  this.update = function () {
    
    
    // var highness = song[Math.floor(document.getElementById('music').currentTime)] / songAvg;

    if (this.player.bullets <= 0) {
      penta.switchState(new OverState('you ran out of bullets', this.player.score));
    }

    if (document.getElementById('music').currentTime == 300) {
      penta.switchState(new OverState('the song is over :\'(', this.player.score));      
    }

    var difficulty = 0.005;
    
    if (songBreakpoints.indexOf(Math.floor(document.getElementById('music').currentTime)) >= 0) {
      difficulty = 0.2;
    }

    if (Math.random() < difficulty || this.enemies.sprites.length == 0) {
      var newEnemy = new penta.Sprite('assets/enemy.png', -5, getRandomInt(this.floorLevel - this.enemySize.height, this.floorLevel - this.enemySize.height - 300));
      newEnemy.vx = getRandomInt(2, 4);
      newEnemy.vy = getRandomInt(-8, 0);
      newEnemy.health = 5000;

      if (Math.random() < 0.1) {
        newEnemy.vy = 0;
      } else {
        newEnemy.vy = getRandomInt(-9, -3);
      }

      newEnemy.floorLevel = this.floorLevel;
      this.enemies.push(newEnemy);
    }

    this.enemies.sprites.forEach((function (enemy, index) {
      if (enemy.x >= 900) {
        this.enemies.remove(enemy);
      }
      
      enemy.x += enemy.vx;
      enemy.y += enemy.vy;

      enemy.vy += 0.1;

      if (enemy.y >= this.floorLevel - this.enemySize.height) {
        enemy.y = this.floorLevel - this.enemySize.height;
        enemy.vy = 0;
      }

      // console.log(enemy.y, this.floorLevel - this.enemySize.height);

      if (enemy.y == this.floorLevel - this.enemySize.height && Math.random() < 0.1) {
        enemy.vy = getRandomInt(-5, 0);
      }

    }).bind(this));

    if (penta.isMouseDown('left') && this.canAccept) {
      if (this.player.canShoot) {
        var shootAudio = document.getElementById('shoot1').cloneNode();
        shootAudio.volume = 0.1;
        shootAudio.play();
        this.player.bullets--;

        this.enemies.sprites.forEach((function (enemy, index) {
          if (isPointInsideRectangle(penta.mouse.x, penta.mouse.y,
                                     enemy.x, enemy.y,
                                     this.enemySize.width,
                                     this.enemySize.height)) {
            enemy.x = 801;
            this.player.score++;
          }
        }).bind(this));

        this.player.canShoot = false;
      }
    } else {
      this.player.canShoot = true;
    }

    if (penta.isMouseDown('right') && this.canAccept) {
      var shootAudio = document.getElementById('shoot2').cloneNode();
      shootAudio.volume = 0.05;
      shootAudio.play();
      this.player.bullets--;

      this.enemies.sprites.forEach((function (enemy, index) {
        if (isPointInsideRectangle(penta.mouse.x, penta.mouse.y,
                                   enemy.x, enemy.y,
                                   this.enemySize.width,
                                   this.enemySize.height)) {
          enemy.health -= 1750;

          if (enemy.health <= 0) {
            enemy.x = 801;
            this.player.score++;
          }
        }
      }).bind(this));
    }

    if (!penta.isMouseDown('left') && !penta.isMouseDown('right')) {
      this.canAccept = true;
    }

  };

  this.draw = function () {
    penta.clearCanvas('#202020');

    penta.drawRectangle(0, this.floorLevel, 800, 320, '#000');

    this.enemies.draw();

    penta.drawLine(0, penta.mouse.y, 800, penta.mouse.y, '#fff');
    penta.drawLine(penta.mouse.x, 0, penta.mouse.x, 640, '#fff');

    penta.currentFont = '30px ProggySquareTT';
    penta.drawString(this.player.score, 780, 20, '#fff', 'right');
    penta.drawString(this.player.bullets, 30, 20, '#fff');

    this.bulletSprite.draw();
  };
}
