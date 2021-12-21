import Node from "./Nodes.mjs";

const $loading = document.querySelector(".Loading");

export default class App {
  constructor() {
    this.node = new Node();
  }

  setState(node) {
    try {
      this.node = node;
      this.render();
    } catch (e) {
      console.error("App Set State Error : ", e);
    }
  }

  async render() {
    try {
      $loading.style.display = "block";
      this.node.breadcrumb.render();
      await this.node.render();
      $loading.style.display = "none";
    } catch (e) {
      console.error("App Render Error : ", e);
    }
  }
}
