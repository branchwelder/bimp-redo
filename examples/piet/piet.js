import { Bimp } from "/Bimp";
import { BimpEditor } from "/BimpEditor";

import { brush, flood, line, rect, shift, pan } from "/tools";
import { toolbox } from "/toolbox";

import { pointerPosition } from "/pointerPosition";
import { drawingCanvas } from "/drawingCanvas";
import { highlight } from "/highlight";
import { buildHexPalette } from "/palette";

const pietPalette = [
  "#000000",
  "#FFFFFF",

  "#FFC0C0",
  "#FFFFC0",
  "#C0FFC0",
  "#C0FFFF",
  "#C0C0FF",
  "#FFC0FF",
  "#FF0000",
  "#FFFF00",
  "#00FF00",
  "#00FFFF",
  "#0000FF",
  "#FF00FF",
  "#C00000",
  "#C0C000",
  "#00C000",
  "#00C0C0",
  "#0000C0",
  "#C000C0",
];

export function piet(parent) {
  const pixels = buildHexPalette(pietPalette);

  let state = {
    bitmap: Bimp.empty(20, 20, 0),
    selection: [],
    aspectRatio: [1, 1],
    scale: 1,
    pan: { x: 0, y: 0 },
  };

  function updateState(state, action) {
    return { ...state, ...action };
  }

  let editor = new BimpEditor({
    state,
    parent,
    dispatch(action) {
      state = updateState(state, action);
      editor.syncState(state);
    },
    components: [
      pointerPosition(),
      drawingCanvas({ palette: pixels }),
      highlight({ cell: true }),
      toolbox({
        tools: { brush, flood, line, rect, shift, pan },
        position: "left",
      }),
    ],
  });

  editor.zoomToFit();
}
