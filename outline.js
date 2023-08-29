function outlineExtension(
  { state, parent },
  {
    cell = false,
    outer = "#000000",
    inner = "#ffffff",
    container = "workspace",
  }
) {
  let { aspectRatio, scale, bitmap, pos, pan } = state;
  let cellSize = [aspectRatio[0] * scale, aspectRatio[1] * scale];

  const dom = document.createElement("canvas");
  dom.style.cssText = `image-rendering: pixelated;`;
  parent[container].appendChild(dom);

  function draw() {
    const ctx = dom.getContext("2d");
    ctx.clearRect(0, 0, dom.width, dom.height);

    ctx.strokeStyle = inner;
    ctx.strokeRect(
      pos.x * cellSize[0] + 0.5,
      pos.y * cellSize[1] + 0.5,
      cellSize[0] - 2,
      cellSize[1] - 2
    );

    ctx.strokeStyle = outer;
    ctx.strokeRect(
      pos.x * cellSize[0] - 0.5,
      pos.y * cellSize[1] - 0.5,
      cellSize[0],
      cellSize[1]
    );
  }

  function resizeCanvas(bitmap) {
    dom.width = bitmap.width * aspectRatio[0] * scale;
    dom.height = bitmap.height * aspectRatio[1] * scale;
  }

  function positionCanvas() {
    dom.style.transform = `translate(${pan.x}px, ${pan.y}px)`;
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
        pan = state.pan;

        cellSize = [aspectRatio[0] * scale, aspectRatio[1] * scale];
        resizeCanvas(bitmap);
        positionCanvas();
        draw();
      }
    },
  };
}

export function outline(options = {}) {
  return (config) => outlineExtension(config, options);
}
