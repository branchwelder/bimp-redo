import { addPanZoom } from "./addPanZoom";
import { Gutter } from "./Gutter";

export class BimpEditor {
  constructor(state, config) {
    let { layers, gutters, dispatch, parent } = config;
    this.state = state;

    this.dom = document.createElement("div");
    this.dom.className = "bimp-view";

    this.layersContainer = this.dom.appendChild(document.createElement("div"));
    this.layersContainer.className = "bimp-layers";

    this.layers = layers.map(
      (Layer) => new Layer(state, { parent: this.layersContainer })
    );

    this.panZoom = addPanZoom(this.layersContainer, this.state, dispatch);

    this.gutters = Object.entries(gutters).map(
      ([pos, gutterFunc]) =>
        new Gutter(state, { parent: this.dom, pos, gutterFunc })
    );

    this.layersContainer.addEventListener("mousemove", (e) => {
      const { x, y } = this.posAtCoords(e.clientX, e.clientY);
      if (this.state.pos.x != x || this.state.pos.y != y) {
        if (
          y < 0 ||
          x < 0 ||
          y >= this.state.bitmap.height ||
          x >= this.state.bitmap.width
        ) {
          // Not over canvas
          dispatch({ pos: { x: -1, y: -1 } });
        } else {
          dispatch({ pos: { x, y } });
        }
      }
    });

    parent.appendChild(this.dom);
  }

  zoomToFit() {
    this.panZoom.zoomToFit();
  }

  posAtCoords(clientX, clientY) {
    // will get the bitmap position at the DOM coords
    // takes into account the visible range and aspect ratio
    const bounds = this.layersContainer.getBoundingClientRect();

    const x = Math.floor(
      (clientX - this.state.pan.x - bounds.x) /
        (this.state.aspectRatio[0] * this.state.scale)
    );
    const y = Math.floor(
      (clientY - this.state.pan.y - bounds.y) /
        (this.state.aspectRatio[1] * this.state.scale)
    );

    return { x, y };
  }

  syncState(state) {
    this.state = state;
    for (const layer of this.layers) layer.syncState(state, this.panZoom);
    for (const gutter of this.gutters) gutter.syncState(state);
  }
}
