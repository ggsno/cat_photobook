import App from "./App.mjs"

try {
  new App().render();
} catch(e) {
  console.error(e);
}