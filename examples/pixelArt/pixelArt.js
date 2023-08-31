import { Bimp } from "/Bimp";
import { BimpEditor } from "/BimpEditor";

import { brush, flood, line, rect, shift, pan } from "/tools";
import { toolbox } from "/toolbox";
import { controlPanel } from "/controlPanel";
import { numberGutter } from "/numberGutter";
import { grid } from "/grid";

import { drawingCanvas } from "/drawingCanvas";
import { outline } from "/outline";
import { highlight } from "/highlight";
import { buildHexPalette } from "/palette";

const startPalette = [
  "#20344c",
  "#faead6",
  "#de7895",
  "#f75060",
  "#f7885f",
  "#f2c469",
  "#b1d36f",
  "#3ee0cf",
  "#0091c2",
  "#ad6dca",
];

const needlePalette = ["#20344c", "#faead6"];

function bottomLeft({ bitmap }, gutterPos, size) {
  if (gutterPos == "bottom" || gutterPos == "top") {
    return Array.apply(null, Array(bitmap.width)).map((x, i) => i + 1);
  } else if (gutterPos == "left" || gutterPos == "right") {
    return Array.apply(null, Array(bitmap.height))
      .map((x, i) => i + 1)
      .reverse();
  }
}

export function pixelArt({ parent = document.body }) {
  let startState = {
    bitmap: Bimp.empty(50, 50, 1),
    selection: [],
    aspectRatio: [1, 1],
    scale: 1,
    pan: { x: 0, y: 0 },
  };

  let editor = new BimpEditor({
    state: startState,
    parent,
    components: [
      drawingCanvas({ paletteBuilder: buildHexPalette(startPalette) }),
      outline(),
      toolbox({
        tools: { brush, flood, line, rect, pan, shift },
        container: "sidebarPrimary",
      }),
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
}
