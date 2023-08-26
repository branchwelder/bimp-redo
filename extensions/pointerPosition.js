export function pointerPosition() {
  return ({ state, parent, dispatch }) => {
    state.pos = { x: -1, y: -1 };

    function posAtCoords(clientX, clientY) {
      // will get the bitmap position at the DOM coords
      // takes into account the visible range and aspect ratio
      const bounds = parent
        .querySelector(":scope > .bimp-layers")
        .getBoundingClientRect();

      const x = Math.floor(
        (clientX - state.pan.x - bounds.x) /
          (state.aspectRatio[0] * state.scale)
      );
      const y = Math.floor(
        (clientY - state.pan.y - bounds.y) /
          (state.aspectRatio[1] * state.scale)
      );

      return { x, y };
    }

    parent
      .querySelector(":scope > .bimp-layers")
      .addEventListener("mousemove", (e) => {
        const { x, y } = posAtCoords(e.clientX, e.clientY);
        if (state.pos.x != x || state.pos.y != y) {
          if (
            y < 0 ||
            x < 0 ||
            y >= state.bitmap.height ||
            x >= state.bitmap.width
          ) {
            // Not over canvas
            dispatch({ pos: { x: -1, y: -1 } });
          } else {
            dispatch({ pos: { x, y } });
          }
        }
      });
    console.log("asdf");

    function syncState(newState) {
      state = newState;
    }

    return syncState;
  };
}
