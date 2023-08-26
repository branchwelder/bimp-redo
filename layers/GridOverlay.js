// config:
// grid color
// grid line width
// major/minor divisions

export class GridOverlay {
  // Draws a grid
  constructor({ bitmap, aspectRatio, scale }, { parent }) {
    this.width = bitmap.width;
    this.height = bitmap.height;
    this.cellSize = [aspectRatio[0] * scale, aspectRatio[1] * scale];
    this.scale = scale;
    this.dom = document.createElement("canvas");
    this.fitCanvas(this.bitmap);

    parent.appendChild(this.dom);

    this.draw();
  }

  fitCanvas() {
    this.dom.width = this.width * this.cellSize[0];
    this.dom.height = this.height * this.cellSize[1];
  }

  draw() {
    const ctx = this.dom.getContext("2d");
    ctx.clearRect(0, 0, this.dom.width, this.dom.height);

    ctx.beginPath();

    for (let x = 0; x < this.width + 1; x++) {
      ctx.moveTo(x * this.cellSize[0], 0);
      ctx.lineTo(x * this.cellSize[0], this.height * this.cellSize[1]);
    }

    for (let y = 0; y < this.height + 1; y++) {
      ctx.moveTo(0, y * this.cellSize[1]);
      ctx.lineTo(this.width * this.cellSize[0], y * this.cellSize[1]);
    }

    ctx.stroke();
  }

  syncState({ bitmap, scale, aspectRatio }) {
    if (
      bitmap.width != this.width ||
      bitmap.height != this.height ||
      this.scale != scale
    ) {
      this.scale = scale;
      this.cellSize = [aspectRatio[0] * scale, aspectRatio[1] * scale];
      this.width = bitmap.width;
      this.height = bitmap.height;
      this.fitCanvas();
      this.draw();
    }
  }
}
