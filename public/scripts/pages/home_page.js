import { Page } from './page.js';
export class HomePage extends Page {
  show(callback) {
    const mainspaceElement = document.querySelector(".js-container");
    mainspaceElement.innerHTML = `
    <h1>Welcome</h1>
    <p>This app allows users to share VTX frequency spectrum. Perform the following steps:</p> 
    <ol>
      <li class="left"><b>Log In</b> using your Name and Meeting ID.</li>
      <li class="left"><b>Enter VTX Channel</b> that you are using.</li>
      <li class="left">Before you fly, check the <b>Show Allocated Channels</b> and coordinate  with anyone on your channel.</li>
      <li class="left">When you leave the Krash Our Quads event, <b>Remove VTX Channel</b>.</li>
    </ol>
    `;
  }
}