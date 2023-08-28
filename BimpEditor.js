import { addPanZoom } from "./addPanZoom";
import { Gutter } from "./Gutter";

export class BimpEditor {
  constructor({ state, gutters = {}, dispatch, parent, components }) {
    this.state = state;

    this.dom = document.createElement("div");
    this.dom.className = "bimp-wrapper";

    this.workspace = this.dom.appendChild(document.createElement("div"));
    this.workspace.className = "bimp-workspace";
    this.layersContainer = this.workspace.appendChild(
      document.createElement("div")
    );
    this.layersContainer.className = "bimp-layers";

    this.components = components.flat().map((ext) =>
      ext({
        state,
        parent: this.dom,
        dispatch,
      })
    );

    this.panZoom = addPanZoom(this.layersContainer, this.state, dispatch);

    this.gutters = Object.entries(gutters).map(
      ([pos, gutterFunc]) =>
        new Gutter(state, { parent: this.workspace, pos, gutterFunc })
    );

    parent.appendChild(this.dom);
  }

  zoomToFit() {
    this.panZoom.zoomToFit();
  }

  syncState(state) {
    this.state = state;
    this.panZoom.syncState(state);
    for (const component of this.components) component.syncState(state);
    for (const gutter of this.gutters) gutter.syncState(state);
  }
}
