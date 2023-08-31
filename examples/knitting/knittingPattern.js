import { Bimp } from "/Bimp";
import { BimpEditor } from "/BimpEditor";

import { brush, flood, line, rect, shift, pan } from "/tools";
import { toolbox } from "/toolbox";

import { numberGutter } from "/numberGutter";

import { drawingCanvas } from "/drawingCanvas";
import { grid } from "/grid";
import { highlight } from "/highlight";
import { buildSymbolPalette } from "/palette";
import { controlPanel } from "/controlPanel";

async function initPalette() {
  const knit = new Image();
  knit.src = "/examples/knitting/stitchSymbols/knit.png";
  await knit.decode();
  const slip = new Image();
  slip.src = "/examples/knitting/stitchSymbols/slip.png";
  await slip.decode();
  const tuck = new Image();
  tuck.src = "/examples/knitting/stitchSymbols/tuck.png";
  await tuck.decode();
  const purl = new Image();
  purl.src = "/examples/knitting/stitchSymbols/purl.png";
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

function bottomLeft({ bitmap }, gutterPos, size) {
  if (gutterPos == "bottom" || gutterPos == "top") {
    return Array.apply(null, Array(bitmap.width)).map((x, i) => i + 1);
  } else if (gutterPos == "left" || gutterPos == "right") {
    return Array.apply(null, Array(bitmap.height))
      .map((x, i) => i + 1)
      .reverse();
  }
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
    components: [
      drawingCanvas({ paletteBuilder: stitchPalette }),
      grid(),
      highlight({ cell: true }),
      toolbox({ tools: { brush, flood, line, rect, shift, pan } }),
      controlPanel(),

      numberGutter({ size: 20, gutterPos: "left", gutterFunc: bottomLeft }),
      numberGutter({
        size: 20,
        gutterPos: "right",
        gutterFunc: bottomLeft,
      }),

      numberGutter({ size: 20, gutterPos: "top", gutterFunc: bottomLeft }),
      numberGutter({
        size: 20,
        gutterPos: "bottom",
        gutterFunc: bottomLeft,
      }),
    ],
  });

  editor.zoomToFit();
}
