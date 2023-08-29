import { html, render } from "lit-html";

function numberArr({ bitmap }, gutterPos, size) {
  return Array.apply(
    null,
    Array(
      gutterPos == "bottom" || gutterPos == "top" ? bitmap.width : bitmap.height
    )
  ).map((x, i) => i + 1);
}

export function numberGutterExtension(
  { state, parent },
  { gutterPos, size, container = "workspace", gutterFunc = numberArr }
) {
  let { bitmap, pan, pos, aspectRatio, scale } = state;
  let arr = gutterFunc(state, gutterPos, size);

  const dom = document.createElement("div");
  parent[container].appendChild(dom);

  function checkHighlight(num) {
    if ((gutterPos == "bottom" || gutterPos == "top") && pos.x == num)
      return true;
    if ((gutterPos == "left" || gutterPos == "right") && pos.y == num)
      return true;
  }

  function updatePosition() {
    const bbox = parent[container].getBoundingClientRect();

    let offX, offY;

    if (gutterPos == "left") {
      offX = pan.x - size;
      offX = offX < 0 ? 0 : offX;
      offY = pan.y;
    } else if (gutterPos == "right") {
      offX = pan.x + bitmap.width * aspectRatio[0] * scale;
      offX = offX + size > bbox.width ? bbox.width - size : offX;
      offY = pan.y;
    } else if (gutterPos == "top") {
      offY = pan.y - size;
      offY = offY < 0 ? 0 : offY;
      offX = pan.x;
    } else if (gutterPos == "bottom") {
      offY = pan.y + bitmap.height * aspectRatio[1] * scale;
      offY = offY + size > bbox.height ? bbox.height - size : offY;
      offX = pan.x;
    }

    dom.style.transform = `translate(${offX}px, ${offY}px)`;
  }

  function updateSize() {
    if (gutterPos == "bottom" || gutterPos == "top") {
      dom.style.width = `${bitmap.width * aspectRatio[0] * scale}px`;
    } else if (gutterPos == "left" || gutterPos == "right") {
      dom.style.height = `${bitmap.height * aspectRatio[1] * scale}px`;
    }
  }

  function view() {
    render(
      html`<style>
          .gutter {
            background-color: #2d2c2c;
            font-family: monospace;
            font-weight: bold;
            color: #969696;
            user-select: none;
            border: 1px solid black;
          }
          .left,
          .right {
            display: flex;
            flex-direction: column;
            width: ${size}px;
          }

          .left .cell,
          .right .cell {
            flex: 0 0 ${aspectRatio[1] * scale}px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .top,
          .bottom {
            display: flex;
            height: ${size}px;
          }

          .top .cell,
          .bottom .cell {
            flex: 0 0 ${aspectRatio[0] * scale}px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .gutter > .cell:nth-of-type(odd) {
            background: #00000022;
          }

          .highlight {
            background-color: #00000044 !important;
            color: #fafafa !important;
          }
        </style>
        <div class="gutter ${gutterPos}">
          ${arr.map(
            (content, index) =>
              html`<div
                class="cell ${checkHighlight(index) ? "highlight" : ""}">
                ${content}
              </div>`
          )}
        </div>`,
      dom
    );
  }

  return {
    syncState(state) {
      ({ bitmap, pan, pos, aspectRatio, scale } = state);
      arr = gutterFunc(state, gutterPos, size);

      updatePosition();
      updateSize();
      view(state);

      // if (
      //   bitmap.width != this.width ||
      //   bitmap.height != this.height ||
      //   pan != this.pan ||
      //   pos != this.pos
      // ) {
      //   this.width = bitmap.width;
      //   this.height = bitmap.height;
      //   this.pan = pan;
      // }
    },
  };
}

export function numberGutter(options = {}) {
  return (config) => numberGutterExtension(config, options);
}
