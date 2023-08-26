import { html, render } from "lit-html";

export function numberGutter({ axis, size }) {
  function renderGutter(state, parent) {
    const arr = Array.apply(
      null,
      Array(axis == "horizontal" ? state.bitmap.width : state.bitmap.height)
    ).map((x, i) => i);

    function checkHighlight(num) {
      if (axis == "horizontal" && state.pos.x == num) return true;
      if (axis == "vertical" && state.pos.y == num) return true;
    }

    const template = html`<style>
        .vertical {
          display: flex;
          flex-direction: column;
          transform: translateY(${state.pan.y}px);
          width: ${size};
        }

        .vertical .cell {
          flex: 0 0 ${state.aspectRatio[1] * state.scale}px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .horizontal {
          display: flex;
          transform: translateX(${state.pan.x}px);
          height: ${size};
        }

        .horizontal .cell {
          flex: 0 0 ${state.aspectRatio[0] * state.scale}px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .highlight {
          background-color: #00000044;
        }
      </style>
      <div class=${axis}>
        ${arr.map(
          (num) =>
            html`<div class="cell ${checkHighlight(num) ? "highlight" : ""}">
              ${num + 1}
            </div>`
        )}
      </div>`;

    render(template, parent);
  }

  return renderGutter;
}
