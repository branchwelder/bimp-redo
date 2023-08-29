function canvasExtension(
  { state, parent, dispatch },
  { paletteBuilder, container = "workspace" }
) {
  state.paletteIndex = 0;

  let palette = paletteBuilder({ state, parent, dispatch });

  let { aspectRatio, scale, pan } = state;
  let bitmap = null;

  const dom = document.createElement("canvas");
  dom.style.cssText = "outline: 1px solid black";
  parent[container].appendChild(dom);
  parent["sidebarSecondary"].appendChild(palette.dom);

  draw(state.bitmap);
  bitmap = state.bitmap;

  function draw(newBitmap) {
    // Draws only the pixels that have changed
    const ctx = dom.getContext("2d");

    for (let y = 0; y < newBitmap.height; y++) {
      for (let x = 0; x < newBitmap.width; x++) {
        let paletteIndex = newBitmap.pixel(x, y);

        if (bitmap == null || bitmap.pixel(x, y) != paletteIndex) {
          ctx.translate(x * aspectRatio[0] * scale, y * aspectRatio[1] * scale);

          palette.draw(
            paletteIndex,
            ctx,
            aspectRatio[0] * scale,
            aspectRatio[1] * scale
          );
          ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
      }
    }
  }

  function resizeCanvas(bitmap) {
    dom.width = bitmap.width * aspectRatio[0] * scale;
    dom.height = bitmap.height * aspectRatio[1] * scale;
  }

  function positionCanvas() {
    dom.style.transform = `translate(${pan.x}px, ${pan.y}px)`;
  }

  function fitCanvas(bitmap) {
    // Caluculates the nearest whole-pixel scale multiplier that will
    // fit this bitmap at the current aspect ratio.
    // There will likely be some padding around the edges - but
    // the canvas can get blurry when dealing with sub-pixels.
    const bbox = parent[container].getBoundingClientRect();

    const newScale = Math.min(
      Math.floor(bbox.width / (bitmap.width * aspectRatio[0])),
      Math.floor(bbox.height / (bitmap.height * aspectRatio[1]))
    );

    const x = Math.floor(
      (bbox.width - bitmap.width * aspectRatio[0] * newScale) / 2
    );
    const y = Math.floor(
      (bbox.height - bitmap.height * aspectRatio[1] * newScale) / 2
    );
    dispatch({ scale: newScale, pan: { x, y } });
  }

  return {
    attached(state) {
      ({ aspectRatio, scale, bitmap } = state);

      fitCanvas(state.bitmap);
      draw(state.bitmap);
    },
    syncState(state) {
      if (
        state.bitmap.width != bitmap.width ||
        state.bitmap.height != bitmap.height
      ) {
        resizeCanvas(state.bitmap);
        fitCanvas(state.bitmap);
        // draw(state.bitmap);
        bitmap = state.bitmap;
      }
      if (
        state.aspectRatio[0] != aspectRatio[0] ||
        state.aspectRatio[1] != aspectRatio[1] ||
        state.scale != scale
      ) {
        bitmap = null;
        aspectRatio = state.aspectRatio;
        scale = state.scale;
        pan = state.pan;
        resizeCanvas(state.bitmap);
        positionCanvas();
      }

      if (state.pan.x != pan.x || state.pan.y || pan.y) {
        pan = state.pan;
        positionCanvas();
      }

      // if (state.bitmap != bitmap) {
      //   draw(state.bitmap);
      //   bitmap = state.bitmap;
      // }
      draw(state.bitmap);
      bitmap = state.bitmap;

      palette.syncState(state);
    },
  };
}

export function drawingCanvas(options = {}) {
  return (config) => canvasExtension(config, options);
}
