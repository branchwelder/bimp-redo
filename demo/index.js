import { Bimp } from "../Bimp";
import { BimpEditor } from "../BimpEditor";
import { BimpCanvas } from "../layers/BimpCanvas";

import { brush, flood, line, rect, shift } from "../tools";
import { ToolSelect } from "../BimpToolbox";

import { numberGutter } from "../gutters/numberGutter";

import { HighlightCell } from "../layers/HighlightCell";
import { HighlightRow } from "../layers/HighlightRow";
import { HighlightColumn } from "../layers/HighlightColumn";
import { GridOverlay } from "../layers/GridOverlay";

import { pointerPosition } from "../extensions/pointerPosition";

let state = {
  tool: "draw",
  paletteIndex: 2,
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
    layers: [
      BimpCanvas,
      HighlightCell,
      HighlightRow,
      HighlightColumn,
      GridOverlay,
    ],
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
    tools: { brush, flood, line, rect, shift },
    controls: [ToolSelect],
    extensions: [pointerPosition()],
  });

  editor.zoomToFit();
}

start();
