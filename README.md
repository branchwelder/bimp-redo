# bimp

### todo

- [x] resize canvas
- [x] pixel-perfect
- [x] grid
  - [ ] major/minor divisions
  - [ ] adjust to zoom
- [x] fill hover
- [x] outline hover
- [x] aspect ratio
- tools
  - [x] brush
  - [x] shift
  - [x] flood
  - [x] line
  - [x] rect
  - [x] pan
  - [ ] zoom
- gutters
  - [x] track canvas position
  - [ ] major/minor divisions
  - [ ] don't render contents if overflowing
- [ ] undo history
- [ ] palette color picker
- [ ] download/export
- [ ] upload

### demo ideas

- tile + map editor
- conways game of life
- minesweeper
- tile repeats
- music notes
- knitting
- piet program editor

### DOM management notes

I think the best approach right now is for the editor class to set up container
divs for a simple grid layout with left, right, and top bars. Then, each
component can put itself in the container it should be in. This could be a
default sidebar, or a node passed in the component configuration.

Should the components be able to manage their own dom attachment? This feels
necessary in order to do things like scale the canvas to fit the container when
it is first added?
