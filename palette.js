import { html, render } from "lit-html";

class Palette {
  constructor(entries, drawFunc) {
    this.entries = entries;
    this.drawFunc = drawFunc;
  }

  addEntry(entry) {
    this.entries.push(entry);
  }

  draw(paletteIndex, ctx, width, height) {
    // a method to draw the specified palette index
    try {
      this.drawFunc(ctx, this.entries[paletteIndex], width, height);
    } catch (e) {
      console.error("Error in palette draw function!", e);
    }
  }
}

class PixelPalette extends Palette {
  // Draws a solid color
  constructor(entries) {
    super(entries);
    this.drawFunc = this.drawPixel;
  }

  getRGB([r, g, b]) {
    try {
      return `rgb(${r} ${g} ${b})`;
    } catch (e) {
      console.warn("Can't destructure palette entries to RGB");
      return `rgb(0 0 0)`;
    }
  }

  getRGBA(index) {
    try {
      const [r, g, b, a] = this.entries[index];
      return `rgb(${r} ${g} ${b} / ${a})`;
    } catch (e) {
      console.warn("Can't destructure palette entries to RGBA");
      return `rgb(0 0 0 / 0)`;
    }
  }

  drawPixel(ctx, value, width, height) {
    ctx.fillStyle = this.getRGB(value);
    ctx.fillRect(0, 0, width, height);
  }
}

function symbolPalette(
  { symbols, showSelect = true },
  { state, parent, dispatch }
) {
  let selected = state.paletteIndex;
  let dom = document.createElement("div");

  function renderSelection() {
    if (!showSelect) return;
    render(
      html`<style>
          .palette-select {
            display: flex;
            gap: 3px;
            justify-content: center;
            height: 50px;
          }
          .palette-select > img {
            border: 1px solid black;
          }
          .selected {
            outline: 2px solid white;
          }
        </style>
        <div class="palette-select">
          ${symbols.map(
            ({ image, title }, index) =>
              html`<img
                class=${index == selected ? "selected" : ""}
                src=${image.src}
                title=${title}
                @click=${() => dispatch({ paletteIndex: index })} />`
          )}
        </div> `,
      dom
    );
  }

  function draw(paletteIndex, ctx, width, height) {
    ctx.drawImage(symbols[paletteIndex].image, 0, 0, width, height);
  }

  function syncState({ paletteIndex }) {
    if (selected != paletteIndex) {
      selected = paletteIndex;
      renderSelection();
    }
  }

  renderSelection();

  return {
    draw,
    dom,
    syncState,
  };
}

function pixelPalette(
  { entries, showSelect = true },
  { state, parent, dispatch }
) {
  let selected = state.paletteIndex;
  let dom = document.createElement("div");
  console.log(entries);

  function getRGB([r, g, b]) {
    try {
      return `rgb(${r} ${g} ${b})`;
    } catch (e) {
      console.warn("Can't destructure palette entries to RGB");
      return `rgb(0 0 0)`;
    }
  }

  function renderSelection() {
    if (!showSelect) return;
    render(
      html`<style>
          .palette-select {
            display: flex;
            gap: 3px;
            justify-content: center;
            height: 50px;
            padding: 3px;
          }
          .palette-select > div {
            border: 1px solid black;
            aspect-ratio: 1;
          }
          .selected {
            outline: 2px solid white;
          }
        </style>
        <div class="palette-select">
          ${entries.map(
            (rgb, index) =>
              html`<div
                class=${index == selected ? "selected" : ""}
                style="background-color: ${getRGB(rgb)}"
                @click=${() => dispatch({ paletteIndex: index })}></div>`
          )}
        </div> `,
      dom
    );
  }

  function draw(paletteIndex, ctx, width, height) {
    ctx.fillStyle = getRGB(entries[paletteIndex]);
    ctx.fillRect(0, 0, width, height);
  }

  function syncState({ paletteIndex }) {
    if (selected != paletteIndex) {
      selected = paletteIndex;
      renderSelection();
    }
  }

  renderSelection();

  return {
    draw,
    dom,
    syncState,
  };
}

function buildSymbolPalette(symbols) {
  return (config) => symbolPalette(symbols, config);
}

function buildPixelPalette(entries) {
  return (config) => pixelPalette({ entries }, config);
}

export { buildPixelPalette, buildSymbolPalette };
