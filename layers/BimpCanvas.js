import { pixel8 } from "../palette";

export class BimpCanvas {
  constructor(state, { parent }) {
    this.aspectRatio = state.aspectRatio;
    this.bitmap = null;
    this.scale = state.scale;
    this.palette = pixel8;
    this.dom = document.createElement("canvas");
    this.dom.className = "bimp-canvas";

    this.fitCanvas(state.bitmap);

    parent.appendChild(this.dom);

    this.draw(state.bitmap, this.palette);
    this.bitmap = state.bitmap;
  }

  syncState({ scale, bitmap, aspectRatio }) {
    if (
      this.bitmap.width != bitmap.width ||
      this.bitmap.height != bitmap.height ||
      this.aspectRatio[0] != aspectRatio[0] ||
      this.aspectRatio[1] != aspectRatio[1] ||
      this.scale != scale
    ) {
      this.bitmap = null;
      this.aspectRatio = aspectRatio;
      this.scale = scale;
      this.fitCanvas(bitmap);
    }

    if (this.bitmap != bitmap) {
      this.draw(bitmap);
      this.bitmap = bitmap;
    }
  }

  fitCanvas(bitmap) {
    this.dom.width = bitmap.width * this.aspectRatio[0] * this.scale;
    this.dom.height = bitmap.height * this.aspectRatio[1] * this.scale;
  }

  draw(newBitmap) {
    // Draws only the pixels that have changed
    const ctx = this.dom.getContext("2d");

    for (let y = 0; y < newBitmap.height; y++) {
      for (let x = 0; x < newBitmap.width; x++) {
        let paletteIndex = newBitmap.pixel(x, y);

        if (this.bitmap == null || this.bitmap.pixel(x, y) != paletteIndex) {
          ctx.translate(
            x * this.aspectRatio[0] * this.scale,
            y * this.aspectRatio[1] * this.scale
          );

          this.palette.draw(
            paletteIndex,
            ctx,
            this.aspectRatio[0] * this.scale,
            this.aspectRatio[1] * this.scale
          );
          ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
      }
    }
  }
}
