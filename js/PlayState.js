function PlayState() {
  this.setup = function () {
    this.floorLevel = 400;
    this.enemySize = { width: 32, height: 32 };
    this.enemies = new penta.SpriteList();
    this.player = { canShoot: true, bullets: 2 };

    setInterval((function () {
      this.player.bullets++;
    }).bind(this), 7000);
  };

  this.update = function () {
    if (Math.random() < 0.005) {
      var newEnemy = new penta.Sprite('assets/enemy.png', -5, this.floorLevel - this.enemySize.height);
      newEnemy.vx = getRandomInt(2, 4);
      newEnemy.vy = getRandomInt(-8, 0);

      if (Math.random() < 0.1) {
        newEnemy.vy = 0;
      } else {
        newEnemy.vy = getRandomInt(-9, -3);
      }

      newEnemy.floorLevel = this.floorLevel;
      this.enemies.push(newEnemy);
      this.player.bullets++;
    }

    this.enemies.sprites.forEach((function (enemy, index) {
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

    if (penta.isMouseDown('left')) {
      if (this.player.canShoot) {
        var shootAudio = document.getElementById("shoot1").cloneNode();
        shootAudio.play();

        this.enemies.sprites.forEach((function (enemy, index) {
          if (isPointInsideRectangle(penta.mouse.x, penta.mouse.y,
                                     enemy.x, enemy.y,
                                     this.enemySize.width,
                                     this.enemySize.height)) {
            this.enemies.remove(enemy);
          }
        }).bind(this));

        this.player.canShoot = false;
        this.player.bullets--;
      }
    } else {
      this.player.canShoot = true;
    }

    if (penta.isMouseDown('right')) {
      
    }
  };

  this.draw = function () {
    penta.clearCanvas('#75bbdb');

    penta.drawRectangle(0, this.floorLevel, 800, 320, '#3f1f1f');

    this.enemies.draw();

    penta.drawLine(0, penta.mouse.y, 800, penta.mouse.y, '#f00');
    penta.drawLine(penta.mouse.x, 0, penta.mouse.x, 640, '#f00');

    penta.currentFont = '30px Arial';
    penta.drawString(this.player.bullets, 20, 20, '#000');
  };
}

penta.setup({ desiredFPS: 60,
              preventedKeys: ['down', 'right', 'left', 'up', 'space'],
              firstState: new PlayState(),
              width: 800,
              height: 640 });

document.getElementById('canvas').addEventListener('contextmenu', function (e) {
  if (e.button === 2) {
    e.preventDefault();
    return false;
  }
}, false);
