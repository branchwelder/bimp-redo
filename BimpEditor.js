import { addPanZoom } from "./addPanZoom";
import { Gutter } from "./Gutter";

export class BimpEditor {
  constructor(state, config) {
    let { layers, gutters, dispatch, parent, extensions } = config;
    this.state = state;

    this.dom = document.createElement("div");
    this.dom.className = "bimp-view";

    this.layersContainer = this.dom.appendChild(document.createElement("div"));
    this.layersContainer.className = "bimp-layers";

    this.extensions = extensions.map((ext) =>
      ext({ state: this.state, parent: this.dom, dispatch })
    );

    this.layers = layers.map(
      (Layer) => new Layer(state, { parent: this.layersContainer })
    );

    this.panZoom = addPanZoom(this.layersContainer, this.state, dispatch);

    this.gutters = Object.entries(gutters).map(
      ([pos, gutterFunc]) =>
        new Gutter(state, { parent: this.dom, pos, gutterFunc })
    );

    parent.appendChild(this.dom);
  }

  zoomToFit() {
    this.panZoom.zoomToFit();
  }

  syncState(state) {
    this.state = state;
    for (const extension of this.extensions) extension(state);

    for (const layer of this.layers) layer.syncState(state, this.panZoom);
    for (const gutter of this.gutters) gutter.syncState(state);
  }
}
