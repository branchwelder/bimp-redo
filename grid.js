function makeGrid({ state, parent, dispatch }) {
  let { aspectRatio, scale, bitmap } = state;
  let cellSize = [aspectRatio[0] * scale, aspectRatio[1] * scale];

  const dom = document.createElement("canvas");
  dom.style.cssText = `image-rendering: pixelated;`;
  parent.querySelector(":scope .bimp-layers").appendChild(dom);

  fitCanvas();
  draw();

  function draw() {
    const ctx = dom.getContext("2d");
    ctx.translate(0.5, 0.5);

    ctx.clearRect(0, 0, dom.width, dom.height);

    ctx.beginPath();

    for (let x = 0; x < bitmap.width + 1; x++) {
      ctx.moveTo(x * cellSize[0], 0);
      ctx.lineTo(x * cellSize[0], bitmap.height * cellSize[1]);
    }

    for (let y = 0; y < bitmap.height + 1; y++) {
      ctx.moveTo(0, y * cellSize[1]);
      ctx.lineTo(bitmap.width * cellSize[0], y * cellSize[1]);
    }

    ctx.stroke();
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
        state.scale != scale
      ) {
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

export function grid() {
  return (config) => makeGrid(config);
}
