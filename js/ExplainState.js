function ExplainState() {
  this.setup = function () {
    this.mouseSprite = new penta.Sprite('assets/mouse.png', 350, 250);

    this.messageShow = true;

    this.canAccept = false;

    setInterval((function () {
      this.messageShow = !this.messageShow;
    }).bind(this), 500);
  };

  this.update = function () {
    if (penta.isMouseDown('left') && penta.isMouseDown('right') && this.canAccept) {
      penta.switchState(new PlayState());
    }

    if (!penta.isMouseDown('left') && !penta.isMouseDown('right')) {
      this.canAccept = true;
    }
  };

  this.draw = function () {
    penta.clearCanvas('#202020');

    this.mouseSprite.draw();

    penta.drawLine(220, 200, 380, 290, '#fff');
    penta.currentFont = '25px ProggySquareTT';
    penta.drawString('sniper shot, hit once to destroy', 220, 175, '#FFF', 'center');

    penta.drawLine(430, 290, 500, 260, '#fff');
    penta.drawString('machine gun, go nuts', 500, 240, '#FFF', 'left');
    penta.drawString('try to save bullets ;)', 410, 460, '#FFF', 'center');

    penta.currentFont = '45px ProggySquareTT';

    if (this.messageShow) {
      penta.drawString('press both mouse buttons to continue', 390, 560, '#FFF', 'center');
    }
  };
}
