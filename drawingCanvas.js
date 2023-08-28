function makeCanvas(paletteBuilder, { state, parent, dispatch }) {
  state.paletteIndex = 0;

  let palette = paletteBuilder({ state, parent, dispatch });

  let { aspectRatio, scale } = state;
  let bitmap = null;

  const dom = document.createElement("canvas");
  parent.querySelector(":scope .bimp-layers").appendChild(dom);
  parent.appendChild(palette.dom);

  fitCanvas(state.bitmap);

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

  function fitCanvas(bitmap) {
    dom.width = bitmap.width * aspectRatio[0] * scale;
    dom.height = bitmap.height * aspectRatio[1] * scale;
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
        bitmap = null;
        aspectRatio = state.aspectRatio;
        scale = state.scale;
        fitCanvas(state.bitmap);
      }

      if (state.bitmap != bitmap) {
        draw(state.bitmap);
        bitmap = state.bitmap;
      }

      palette.syncState(state);
    },
  };
}

export function drawingCanvas({ palette }) {
  return (config) => makeCanvas(palette, config);
}
