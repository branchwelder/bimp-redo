import { Bimp } from "../Bimp";
import { BimpEditor } from "../BimpEditor";

import { brush, flood, line, rect, shift, pan } from "../tools";
import { toolbox } from "../BimpToolbox";

import { numberGutter } from "../gutters/numberGutter";

import { pointerPosition } from "../extensions/pointerPosition";
import { drawingCanvas } from "../extensions/drawingCanvas";
import { grid } from "../extensions/grid";
import { highlight } from "../extensions/highlight";
import { pixel8 } from "../palette";

let state = {
  bitmap: Bimp.empty(10, 10, 1),
  selection: [],
  aspectRatio: [1, 1],
  scale: 1,
  pan: { x: 0, y: 0 },
};

function updateState(state, action) {
  return Object.assign({}, state, action);
}

function start() {
  let editor = new BimpEditor(state, {
    parent: document.body,
    gutters: {
      l: numberGutter({ size: "30px", axis: "vertical" }),
      r: numberGutter({ size: "30px", axis: "vertical" }),
      t: numberGutter({ size: "30px", axis: "horizontal" }),
      b: numberGutter({ size: "30px", axis: "horizontal" }),
    },
    dispatch(action) {
      state = updateState(state, action);
      editor.syncState(state);
    },
    extensions: [
      pointerPosition(),
      drawingCanvas({ palette: pixel8 }),
      grid(),
      highlight({ cell: true }),
      toolbox({ tools: { brush, flood, line, rect, shift, pan } }),
    ],
  });

  editor.zoomToFit();
}

start();
