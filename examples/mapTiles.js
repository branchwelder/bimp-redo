import { Bimp } from "../Bimp";
import { BimpEditor } from "../BimpEditor";

import { brush, flood, line, rect, shift, pan } from "../tools";
import { toolbox } from "../toolbox";

import { numberGutter } from "../numberGutter";

import { pointerPosition } from "../pointerPosition";
import { drawingCanvas } from "../drawingCanvas";
import { grid } from "../grid";
import { highlight } from "../highlight";
import { buildSymbolPalette, buildPixelPalette } from "../palette";

export function tileEditor() {
  const container = document.createElement("div");
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

  let tileState = {
    bitmap: Bimp.empty(8, 8, 2),
    selection: [],
    aspectRatio: [1, 1],
    scale: 1,
    pan: { x: 0, y: 0 },
  };

  function updateState(state, action) {
    return { ...state, ...action };
  }

  let tile = new BimpEditor({
    state: tileState,
    parent: container,
    dispatch(action) {
      tileState = updateState(tileState, action);
      tile.syncState(tileState);
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

  let mapState = {
    bitmap: Bimp.empty(8, 8, 2),
    selection: [],
    aspectRatio: [1, 1],
    scale: 1,
    pan: { x: 0, y: 0 },
  };

  let map = new BimpEditor({
    state: mapState,
    parent: container,
    dispatch(action) {
      mapState = updateState(mapState, action);
      map.syncState(mapState);
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

  document.body.appendChild(container);

  tile.zoomToFit();
  map.zoomToFit();
}
