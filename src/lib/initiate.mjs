import { Breadcrumb, DirInfo } from "./datastructure.mjs";
import { printBreadcrumb } from "./breadcrumb.mjs";
import { printNodeAsync } from "./node.mjs";

const defaultBreadCrumb = new Breadcrumb([new DirInfo("root", "root")]);

function initiate(breadcrumb = defaultBreadCrumb) {
  try {
    (async () => {
      document.querySelector(".Loading").style.display = "block";
      printBreadcrumb(breadcrumb);
      await printNodeAsync(breadcrumb);
      document.querySelector(".Loading").style.display = "none";
    })();
  } catch (err) {
    console.error('initiate Error :', err);
  }
}
export { initiate };