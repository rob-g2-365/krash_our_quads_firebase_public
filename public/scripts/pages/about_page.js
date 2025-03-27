import { Page } from './page.js';
import { VERSION } from '../constants.js';

export class AboutPage extends Page {
  show(callback) {
    const mainspaceElement = document.querySelector(".js-container");
    mainspaceElement.innerHTML = `
      <h1>About</h1>
      <h2>Krash our Quads</h2>
      <h2>VTX Frequency Configuration App</h2>
      <h2>Written by Rob Gorsegner</h2>
      <h3>Version ${VERSION} </h3>
      <h3>Copyright &copy 2025 </h3>
      `;
  }
}