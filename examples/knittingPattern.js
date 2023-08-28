import { Bimp } from "../Bimp";
import { BimpEditor } from "../BimpEditor";

import { brush, flood, line, rect, shift, pan } from "../tools";
import { toolbox } from "../toolbox";

import { numberGutter } from "../numberGutter";

import { pointerPosition } from "../pointerPosition";
import { drawingCanvas } from "../drawingCanvas";
import { grid } from "../grid";
import { highlight } from "../highlight";
import { buildSymbolPalette } from "../palette";

async function initPalette() {
  const knit = new Image();
  knit.src = "/examples/stitchSymbols/knit.png";
  await knit.decode();
  const slip = new Image();
  slip.src = "/examples/stitchSymbols/slip.png";
  await slip.decode();
  const tuck = new Image();
  tuck.src = "/examples/stitchSymbols/tuck.png";
  await tuck.decode();
  const purl = new Image();
  purl.src = "/examples/stitchSymbols/purl.png";
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

export function knittingPattern(parent) {
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
