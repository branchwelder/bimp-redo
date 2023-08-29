import { Bimp } from "/Bimp";
import { BimpEditor } from "/BimpEditor";

import { brush, flood, line, rect, shift, pan } from "/tools";
import { toolbox } from "/toolbox";
import { controlPanel } from "/controlPanel";

import { drawingCanvas } from "/drawingCanvas";
import { outline } from "/outline";
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

export function pixelArt({ parent = document.body }) {
  let startState = {
    bitmap: Bimp.empty(100, 100, 1),
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
    ],
  });

  // editor.dispatch({
  //   bitmap: editor.state.bitmap.rect({ x: 1, y: 1 }, { x: 2, y: 2 }, 3),
  // });
}
