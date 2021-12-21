import { prevClickedEvent, fileClickedEvent, dirClickedEvent } from "./event.mjs";

const DIRECTORY_IMAGE = "assets/directory.png";
const FILE_IMAGE = "assets/file.png"; 
const PREV_IMAGE = "assets/prev.png";

async function printNodeAsync(breadcrumb) {
  const url = "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";
  const $nodes = document.querySelector(".Nodes");

  while ($nodes.hasChildNodes()) $nodes.removeChild($nodes.firstChild);

  if (breadcrumb.dirList.length > 1) {
    printPrevDir(breadcrumb);
  }

  const nodeId = breadcrumb.peekDir().id;
  const res = await fetch(`${url}/${nodeId === "root" ? '' : nodeId}`);
  const nodeList = await res.json();
  nodeList.forEach((node) => {
    const $node = getNode(breadcrumb, node);
    $nodes.appendChild($node);
  });
}

function printPrevDir(breadcrumb) {
  const $nodes = document.querySelector(".Nodes");
  const $node = document.createElement("div");
  const $img = document.createElement("img");
  $node.classList.add('Node');
  $img.src = PREV_IMAGE;
  $node.appendChild($img);
  $nodes.appendChild($node);
  
  prevClickedEvent($node, breadcrumb);
}

function getNode(breadcrumb, { id, name, type, filePath }) {
  const $node = document.createElement("div");
  const $img = document.createElement("img");
  const $name = document.createElement("div");
  if (type === "DIRECTORY") {
    $img.src = DIRECTORY_IMAGE;
    dirClickedEvent($node, breadcrumb, id, name);
  } else {
    $img.src = FILE_IMAGE;
    fileClickedEvent($node, filePath);
  }
  $name.innerText = name;
  $node.classList.add("Node");
  $node.appendChild($img);
  $node.appendChild($name);
  return $node;
}

export { printNodeAsync };
