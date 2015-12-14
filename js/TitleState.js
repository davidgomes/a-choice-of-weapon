function TitleState() {
  this.setup = function () {
    this.messageShow = true;

    setInterval((function () {
      this.messageShow = !this.messageShow;
    }).bind(this), 500);
  };

  this.update = function () {
    if (penta.isMouseDown('left') || penta.isMouseDown('right')) {
      penta.switchState(new ExplainState());
    }
  };

  this.draw = function () {
    penta.clearCanvas('#202020');

    penta.currentFont = '70px ProggySquareTT';
    penta.drawString('a choice of weapon', 385, 200, '#FFF', 'center');

    penta.currentFont = '50px ProggySquareTT';

    if (this.messageShow) {
      penta.drawString('press a mouse button to play', 395, 400, '#FFF', 'center');
    }
  };
}
