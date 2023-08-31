import { html, render } from "lit-html";
import { live } from "lit-html/directives/live.js";

function resizeControl() {
  function view({ bitmap }, dispatch) {
    return html`<style>
        .resize-control {
          font-size: 0.8rem;
          display: grid;
          grid-template-columns: auto 1fr max-content 1fr;
          gap: 5px;
        }
        .size-input {
          max-width: 40px;
        }
        .minus::before {
          content: "-";
        }
        .plus::before {
          content: "+";
        }
      </style>
      <div class="resize-control">
        <span>Width</span>
        <button
          class="minus"
          @click=${() =>
            dispatch({
              bitmap: bitmap.resize(bitmap.width - 1, bitmap.height),
            })}></button>
        <input
          type="number"
          class="size-input"
          .value=${live(bitmap.width)}
          @change=${(e) =>
            dispatch({
              bitmap: bitmap.resize(Number(e.target.value), bitmap.height),
            })} />
        <button
          class="plus"
          @click=${() =>
            dispatch({
              bitmap: bitmap.resize(bitmap.width + 1, bitmap.height),
            })}></button>
        <span>Height</span>

        <button
          class="minus"
          @click=${() =>
            dispatch({
              bitmap: bitmap.resize(bitmap.width, bitmap.height - 1),
            })}></button>
        <input
          type="number"
          .value=${live(bitmap.height)}
          class="size-input"
          @change=${(e) =>
            dispatch({
              bitmap: bitmap.resize(bitmap.width, Number(e.target.value)),
            })} />
        <button
          class="plus"
          @click=${() =>
            dispatch({
              bitmap: bitmap.resize(bitmap.width, bitmap.height + 1),
            })}></button>
      </div>`;
  }
  return { view };
}

function controlPanelExtension(
  { state, parent, dispatch },
  { controls = [resizeControl()], container = "sidebarPrimary" }
) {
  const dom = document.createElement("div");
  parent[container].appendChild(dom);

  function view() {
    return html`<style></style>
      <div>${controls.map((control) => control.view(state, dispatch))}</div>`;
  }

  render(view(), dom);

  return {
    syncState(newState) {
      state = newState;
      render(view(), dom);
    },
  };
}

export function controlPanel(options = {}) {
  return (config) => controlPanelExtension(config, options);
}
