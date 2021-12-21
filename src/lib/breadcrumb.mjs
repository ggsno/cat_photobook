import { breadcrumbClickedEvent } from "./event.mjs";

const CLASS_NAME = 'Breadcrumb';

function printBreadcrumb(breadcrumb) {
  try {
    (() => {
      let $breadcrumb = document.querySelector(`.${CLASS_NAME}`);

      while ($breadcrumb.hasChildNodes())
        $breadcrumb.removeChild($breadcrumb.firstChild);
    
      breadcrumb.dirList.forEach(({ id, name }) => {
        const $div = document.createElement("div");
        $div.innerText = name;
        $div.id = id;
        breadcrumbClickedEvent($div, breadcrumb, id);
        $breadcrumb.appendChild($div);
      });
    })();
  } catch (err) {
    console.error('printBreadcrumb Error :',err);
  }
}

export { printBreadcrumb, }