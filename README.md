# bimp

### todo

- fixed pan/zoom
- position things in gutters
- resize canvas
- download/export
- upload

### demos

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
