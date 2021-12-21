import App from "./App.mjs";
import Breadcrumb from "./Breadcrumb.mjs";
import FileViewer from "./FileViewer.mjs";

const DIRECTORY_IMAGE = "assets/directory.png";
const FILE_IMAGE = "assets/file.png";
const PREV_IMAGE = "assets/prev.png";
const NODE_CLASS = "Node";
const DIR_TYPE = "DIRECTORY";
const DIR_URL =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/";
const NOT_FOUND_INDEX = -1;
const $nodes = document.querySelector(".Nodes");

export default class Node {
  constructor(breadcrumb = new Breadcrumb(), cache = []) {
    this.breadcrumb = breadcrumb;
    this.cache = cache;
  }

  async render() {
    while ($nodes.hasChildNodes()) $nodes.removeChild($nodes.firstChild);

    const nodes = await this.getNode();

    if (!this.breadcrumb.isRoot) {
      const $prevNode = document.createElement("div");
      const $img = document.createElement("img");

      $prevNode.classList.add(NODE_CLASS);
      $img.src = PREV_IMAGE;

      $prevNode.appendChild($img);
      $prevNode.addEventListener("click", () => {
        const newBreadcrumb = new Breadcrumb(
          this.breadcrumb.dirList.slice(0, -1), this.cache
        );
        new App().setState(new Node(newBreadcrumb, this.cache));
      });

      $nodes.appendChild($prevNode);
    }

    nodes.forEach(({ id, name, type, filePath }) => {
      const $node = document.createElement("div");
      const $img = document.createElement("img");
      const $name = document.createElement("div");

      $node.classList.add(NODE_CLASS);
      $img.src = type === DIR_TYPE ? DIRECTORY_IMAGE : FILE_IMAGE;
      $name.innerText = name;

      $node.appendChild($img);
      $node.appendChild($name);
      $node.addEventListener("click", () => {
        if (type === DIR_TYPE) {
          const newBreadcrumb = new Breadcrumb(
            this.breadcrumb.dirList.concat({ id, name }), this.cache
          );
          new App().setState(new Node(newBreadcrumb, this.cache));
        } else {
          new FileViewer(filePath).render();
        }
      });

      $nodes.appendChild($node);
    });
  }

  getNode() {
    let cacheIndex = NOT_FOUND_INDEX;

    if (this.cache.length > 0) {
      cacheIndex = this.cache.findIndex(
        ({ id }) => id === this.breadcrumb.peek().id
      );
    }

    return cacheIndex !== NOT_FOUND_INDEX
      ? this.cache[cacheIndex].nodes
      : (async () => {
          const nodes = await (
            await fetch(
              `${DIR_URL}${
                this.breadcrumb.isRoot ? "" : this.breadcrumb.peek().id
              }`
            )
          ).json();
          this.cache.push({ id: this.breadcrumb.peek().id, nodes });
          return nodes;
        })();
  }

}
