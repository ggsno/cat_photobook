import App from "./App.mjs";
import Node from "./Nodes.mjs";

const $breadcrumb = document.querySelector(".Breadcrumb");
const ROOT_NAME = "root"
const ROOT_INDEX = -1;

export default class Breadcrumb {
  constructor(dirList = [{ id: ROOT_INDEX, name: ROOT_NAME}], nodeCache) {
    this.dirList = dirList;
    this.isRoot = this.peek().id === ROOT_INDEX;
    this.nodeCache = nodeCache;
  }

  render() {
    while ($breadcrumb.hasChildNodes()) $breadcrumb.removeChild($breadcrumb.firstChild);
    
    this.dirList.forEach(({ id, name }) => {
      const div = document.createElement("div");
      div.id = id;
      div.innerText = name;
      div.addEventListener("click", () => {
        if (id === this.peek().id) return;

        let newBreadcrumb = null;

        if (id === ROOT_INDEX) {
          newBreadcrumb = new Breadcrumb([this.dirList[0]], this.nodeCache);
        } else {
          const clickedIndex = this.dirList.findIndex(({ id:itemId }) => itemId === id);
          newBreadcrumb = new Breadcrumb(this.dirList.slice(0, clickedIndex + 1), this.nodeCache);
        }

        new App().setState(new Node(newBreadcrumb, this.nodeCache));
      })

      $breadcrumb.appendChild(div);
    });
  }

  peek() {
    return this.dirList[this.dirList.length - 1];
  }
}
