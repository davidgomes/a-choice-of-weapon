function PlayState() {
  this.setup = function () {
    this.aim = {};
    this.floorLevel = 400;
    this.enemySize = { width: 32, height: 32 };
    this.enemies = new penta.SpriteList();
  };

  this.update = function () {
    if (Math.random() < 0.005) {
      var newEnemy = new penta.Sprite('assets/enemy.png', -5, this.floorLevel - this.enemySize.height);
      newEnemy.vx = getRandomInt(1.8, 2.9);
      newEnemy.vy = getRandomInt(-5, 0);
      newEnemy.floorLevel = this.floorLevel;
      this.enemies.push(newEnemy);
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
      this.enemies.sprites.forEach((function (enemy, index) {
        if (isPointInsideRectangle(penta.mouse.x, penta.mouse.y,
                                   enemy.x, enemy.y,
                                   this.enemySize.width,
                                   this.enemySize.height)) {
          this.enemies.remove(enemy);
        }
      }).bind(this));
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
