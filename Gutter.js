export class Gutter {
  constructor(state, { parent, pos, gutterFunc }) {
    let { bitmap, pan } = state;
    this.pos = pos;
    this.gutterFunc = gutterFunc;

    this.width = bitmap.width;
    this.height = bitmap.height;
    this.pan = pan;

    this.dom = parent.appendChild(document.createElement("div"));
    this.dom.className = `bimp-gutter bimp-gutter-${pos}`;

    this.draw(state);
  }

  draw(state) {
    this.gutterFunc({ state, parent: this.dom });
  }

  syncState(state) {
    let { bitmap, pan, pos } = state;
    if (
      bitmap.width != this.width ||
      bitmap.height != this.height ||
      pan != this.pan ||
      pos != this.pos
    ) {
      this.width = bitmap.width;
      this.height = bitmap.height;
      this.pan = pan;
      this.draw(state);
    }
  }
}
