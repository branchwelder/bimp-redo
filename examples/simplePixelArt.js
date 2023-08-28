import { Bimp } from "../Bimp";
import { BimpEditor } from "../BimpEditor";

import { brush, flood, line, rect, shift, pan } from "../tools";
import { toolbox } from "../toolbox";

import { pointerPosition } from "../pointerPosition";
import { drawingCanvas } from "../drawingCanvas";
import { highlight } from "../highlight";
import { buildPixelPalette } from "../palette";

export function simplePixelArt(parent) {
  const p8 = [
    [0, 0, 0],
    [255, 0, 0],
    [0, 255, 0],
    [0, 0, 255],
    [255, 0, 255],
    [255, 255, 0],
    [0, 255, 255],
    [255, 255, 255],
  ];

  const pixels = buildPixelPalette(p8);

  let state = {
    bitmap: Bimp.empty(20, 20, 1),
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
        tools: { brush, flood, line, rect, pan },
        position: "left",
      }),
    ],
  });

  editor.zoomToFit();
}
