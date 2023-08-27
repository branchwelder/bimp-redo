import { html, render } from "lit-html";

function buildToolbox(tools, { state, parent, dispatch }) {
  state.activeTool = Object.keys(tools)[0];

  const layers = parent.querySelector(":scope .bimp-layers");

  layers.addEventListener("pointerdown", (e) => {
    let pos = state.pos;
    let tool = tools[state.activeTool];
    let onMove = tool(pos, state, dispatch);

    if (!onMove) return;

    let move = (moveEvent) => {
      if (moveEvent.buttons == 0) {
        layers.removeEventListener("mousemove", move);
      } else {
        let newPos = state.pos;
        if (newPos.x == pos.x && newPos.y == pos.y) return;
        onMove(state.pos, state);
        pos = newPos;
      }
    };
    layers.addEventListener("mousemove", move);
  });

  function view(state) {
    return html`<style>
        button {
          padding: 3px 8px;
          border: 0;
          outline: 0;
          border-radius: 4px;
          background-color: #252525;
          color: #9e9e9e;
          cursor: pointer;
        }
        button:hover {
          background-color: #676767;
        }

        .tool-container {
          display: flex;
          gap: 5px;
        }
        .active {
          background-color: #343434;
          color: #f1f1f1;
        }
      </style>
      <div class="tool-container">
        ${Object.keys(tools).map(
          (tool) =>
            html`<button
              class=${state.activeTool == tool ? "active" : ""}
              @click=${() => dispatch({ activeTool: tool })}>
              ${tool}
            </button>`
        )}
      </div>`;
  }
  return {
    syncState(newState) {
      state = newState;
      render(view(state), parent);
    },
  };
}

export function toolbox({ tools }) {
  return (config) => buildToolbox(tools, config);
}
