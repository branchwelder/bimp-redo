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

async function initPalette() {
  const knit = new Image();
  knit.src = "/stitchSymbols/knit.png";
  await knit.decode();
  const slip = new Image();
  slip.src = "/stitchSymbols/slip.png";
  await slip.decode();
  const tuck = new Image();
  tuck.src = "/stitchSymbols/tuck.png";
  await tuck.decode();
  const purl = new Image();
  purl.src = "/stitchSymbols/purl.png";
  await purl.decode();
  return {
    symbols: [
      { image: knit, title: "Knit" },
      { image: purl, title: "Purl" },
      { image: slip, title: "Slip" },
      { image: tuck, title: "Tuck" },
    ],
  };
}

const stitchPalette = buildSymbolPalette(await initPalette());

function setupStitchEditor() {
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
    components: [
      pointerPosition(),
      drawingCanvas({ palette: stitchPalette }),
      grid(),
      highlight({ cell: true }),
      toolbox({ tools: { brush, flood, line, rect, shift, pan } }),
    ],
  });

  editor.zoomToFit();
}

function setupPixelEditor() {
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
    bitmap: Bimp.empty(50, 20, 1),
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
    parent: document.body,
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

setupStitchEditor();
setupPixelEditor();
