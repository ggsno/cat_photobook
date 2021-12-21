const FILE_URL =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";
const VIEWER_CLASS = "ImageViewer";
const MODAL_CLASS = "Modal";
const CONTENT_CLASS = "Content";

export default class FileViewer {
  constructor(filePath) {
    this.filePath = filePath;
  }

  render() {
    const $main = document.querySelector("main");
    const $imageViewer = document.createElement("div");
    const $picture = document.createElement("img");
    const $content = document.createElement("div");
    
    $imageViewer.classList.add(VIEWER_CLASS);
    $imageViewer.classList.add(MODAL_CLASS);
    $content.classList.add(CONTENT_CLASS);
    $picture.src = `${FILE_URL}${this.filePath}`;

    $content.appendChild($picture);
    $imageViewer.appendChild($content);
    $main.appendChild($imageViewer);

    this.setViewrEscapeEvent($imageViewer, $picture);
  }

  setViewrEscapeEvent($imageViewer, $picture) {
    const eventHandler = {
      escKeyDown: ({ key }) => {
        if (key === "Escape") {
          escapeAndRemoveEvent();
        }
      },
      preventPropagate: (e) => e.stopPropagation(),
      outsideClick: () => escapeAndRemoveEvent(),
    };

    window.addEventListener("keydown", eventHandler.escKeyDown);
    $picture.addEventListener("click", eventHandler.preventPropagate);
    $imageViewer.addEventListener("click", eventHandler.outsideClick);

    const escapeAndRemoveEvent = () => {
      window.removeEventListener("keydown", eventHandler.escKeyDown);
      $picture.removeEventListener("click", eventHandler.preventPropagate);
      $imageViewer.removeEventListener("click", eventHandler.outsideClick);
      $imageViewer.remove();
    };
  }
}
