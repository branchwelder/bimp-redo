export class HighlightRow {
  // Highlights the cell that is currently hovered
  constructor({ bitmap, aspectRatio, scale, pos }, { parent }) {
    this.width = bitmap.width;
    this.height = bitmap.height;
    this.pos = pos;
    this.cellSize = [aspectRatio[0] * scale, aspectRatio[1] * scale];
    this.scale = scale;
    this.dom = document.createElement("canvas");
    this.fitCanvas();

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

    ctx.fillStyle = "#00000044";
    ctx.fillRect(
      0,
      this.pos.y * this.cellSize[1],
      this.cellSize[0] * this.width,
      this.cellSize[1]
    );
  }

  syncState({ bitmap, scale, aspectRatio, pos }) {
    if (
      bitmap.width != this.width ||
      bitmap.height != this.height ||
      scale != this.scale ||
      pos != this.pos
    ) {
      this.scale = scale;
      this.cellSize = [aspectRatio[0] * scale, aspectRatio[1] * scale];
      this.width = bitmap.width;
      this.height = bitmap.height;
      this.pos = pos;
      this.fitCanvas();
      this.draw();
    }
  }
}
