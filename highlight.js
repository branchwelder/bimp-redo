function makeHighlight(
  { cell = false, row = false, col = false, color = "#00000044" },
  { state, parent }
) {
  let { aspectRatio, scale, bitmap, pos } = state;
  let cellSize = [aspectRatio[0] * scale, aspectRatio[1] * scale];

  const dom = document.createElement("canvas");
  dom.style.cssText = `image-rendering: pixelated;`;
  parent.querySelector(":scope .bimp-layers").appendChild(dom);

  fitCanvas();
  draw();

  function draw() {
    const ctx = dom.getContext("2d");
    ctx.clearRect(0, 0, dom.width, dom.height);
    ctx.fillStyle = color;

    if (cell) {
      ctx.fillRect(
        pos.x * cellSize[0],
        pos.y * cellSize[1],
        cellSize[0],
        cellSize[1]
      );
    }
    if (row) {
      ctx.fillRect(
        0,
        pos.y * cellSize[1],
        cellSize[0] * bitmap.width,
        cellSize[1]
      );
    }
    if (col) {
      ctx.fillRect(
        pos.x * cellSize[0],
        0,
        cellSize[0],
        cellSize[1] * bitmap.height
      );
    }
  }

  function fitCanvas() {
    dom.width = bitmap.width * cellSize[0];
    dom.height = bitmap.height * cellSize[1];
  }

  return {
    syncState(state) {
      if (
        state.bitmap.width != bitmap.width ||
        state.bitmap.height != bitmap.height ||
        state.aspectRatio[0] != aspectRatio[0] ||
        state.aspectRatio[1] != aspectRatio[1] ||
        state.scale != scale ||
        state.pos != pos
      ) {
        pos = state.pos;
        bitmap = state.bitmap;
        aspectRatio = state.aspectRatio;
        scale = state.scale;
        cellSize = [aspectRatio[0] * scale, aspectRatio[1] * scale];
        fitCanvas();
        draw();
      }
    },
  };
}

export function highlight({ cell, row, col }) {
  return (config) => makeHighlight({ cell, row, col }, config);
}
