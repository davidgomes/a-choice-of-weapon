function OverState(reason, score) {
  this.setup = function () {
    document.getElementById('music').pause();
    this.canAccept = false;
  };

  this.update = function () {
    if (!penta.isMouseDown('left') && !penta.isMouseDown('right')) {
      this.canAccept = true;
    }

    if ((penta.isMouseDown('left') || penta.isMouseDown('right')) && this.canAccept) {
      penta.switchState(new PlayState());
    }
  };

  this.draw = function () {
    penta.clearCanvas('#202020');

    penta.currentFont = '50px ProggySquareTT';

    penta.drawString(reason, 380, 100, '#FFF', 'center');
    penta.drawString('your score was ' + score, 375, 200, '#fff', 'center');

    penta.currentFont = '40px ProggySquareTT';

    penta.drawString('press a mouse button to start again', 380, 300, '#FFF', 'center');
  };
}
