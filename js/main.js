document.getElementById('canvas').addEventListener('contextmenu', function (e) {
  if (e.button === 2) {
    e.preventDefault();
    return false;
  }

  return true;
}, false);


penta.setup({ desiredFPS: 60,
              preventedKeys: ['down', 'right', 'left', 'up', 'space'],
              firstState: new TitleState(),
              width: 800,
              height: 640 });
