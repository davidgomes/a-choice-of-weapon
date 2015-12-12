var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var isPointInsideRectangle = function (x, y, rectX, rectY, rectWidth, rectHeight) {
  return x >= rectX && y >= rectY && x <= rectX + rectWidth && y <= rectY + rectHeight;
};
