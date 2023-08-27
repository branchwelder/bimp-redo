export function pointerPosition() {
  return ({ state, parent, dispatch }) => {
    state.pos = { x: -1, y: -1 };

    function posAtCoords(clientX, clientY) {
      // will get the bitmap position at the DOM coords
      // takes into account the visible range and aspect ratio
      const bounds = parent
        .querySelector(":scope .bimp-layers")
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
      .querySelector(":scope .bimp-layers")
      .addEventListener("mousemove", (e) => {
        const { x, y } = posAtCoords(e.clientX, e.clientY);
        if (state.pos.x != x || state.pos.y != y) {
          dispatch({ pos: { x, y } });
        }
      });

    return {
      syncState(newState) {
        state = newState;
      },
    };
  };
}
