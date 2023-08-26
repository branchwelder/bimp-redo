// import { html } from "lit-html";

export class ToolSelect {
  constructor(state, { tools, dispatch }) {
    // this.tools = tools.map((Tool) => new Tool());
    // this.template = html`<div>
    //   ${Object.entries(tools).map(
    //     ([toolName, icon]) =>
    //       html`<input type="radio" name="tool-select" id=${toolName} />
    //         <label for=${toolName}>
    //           <i class="fa-solid fa-up-down-left-right"></i>
    //         </label>`
    //   )}
    // </div>`;
    // @onchange=${(e) => dispatch({ tool: e.target.value })}>
    // this.select = elt(
    //   "select",
    //   {
    //     onchange: () => dispatch({ tool: this.select.value }),
    //   },
    //   ...Object.keys(tools).map((name) =>
    //     elt(
    //       "option",
    //       {
    //         selected: name == state.tool,
    //       },
    //       name
    //     )
    //   )
    // );
    // this.dom = elt("label", null, "🖌 Tool: ", this.select);
  }

  // view() {
  //   return html`<div>${this.tools.map((tool) => tool.view())}</div>`;
  // }
  syncState(state) {
    this.select.value = state.tool;
  }
}
