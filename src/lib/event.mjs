import { DirInfo } from "./datastructure.mjs";
import { initiate } from "./initiate.mjs";

const url = "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public"

function dirClickedEvent($dir, breadcrumb, id, name) {
  $dir.addEventListener("click", () => {
    breadcrumb.pushDir(new DirInfo(id, name));
    initiate(breadcrumb);
  });
}

function prevClickedEvent($prev, breadcrumb){
  $prev.addEventListener("click", () => {
    breadcrumb.popDir();
    initiate(breadcrumb);
  });
}

function fileClickedEvent($file, filePath) {
  $file.addEventListener("click", () => {
    const $main = document.querySelector("main");
    const $imageViewer = document.createElement("div");
    const $content = document.createElement("div");
    const $picture = document.createElement("img");
    $imageViewer.classList.add("ImageViewer");
    $imageViewer.classList.add("Modal");
    $content.classList.add("content");
    $picture.src = `${url}${filePath}`;
    $content.appendChild($picture);
    $imageViewer.appendChild($content);
    $main.appendChild($imageViewer);

    escapeEvent($imageViewer, $picture);
  });
}

function escapeEvent($imageViewer, $picture) {
  $picture.addEventListener("click", e => {
    e.stopPropagation();
  })
  
  $imageViewer.addEventListener("click", () => {
    $imageViewer.remove();
    window.removeEventListener("keydown", escKeyDown);
  });
  
  const escKeyDown = ({ key }) => {
    if (key === "Escape"){
      $imageViewer.remove();
    }
  };

  window.addEventListener("keydown", escKeyDown, { once: true });
}

function breadcrumbClickedEvent($div, breadcrumb) {
  $div.addEventListener("click", () => {
    const id = $div.getAttribute("id");
    if (id === breadcrumb.peekDir().id) return;
    while (breadcrumb.peekDir().id !== id && breadcrumb.peekDir().id !== "root") {
      breadcrumb.popDir();
    };
    initiate(breadcrumb);
  })
}

export { dirClickedEvent, prevClickedEvent, fileClickedEvent, breadcrumbClickedEvent };