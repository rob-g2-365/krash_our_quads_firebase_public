import { Page } from './page.js';
import { getGlobalHtmlStatus } from '../user_info.js';
import { deleteFireStoreUserData } from '../firebase_database.js';

export class RemoveChannelPage extends Page {
  #callback = null;
  #removeListenerInfo = null;
  #cancelListenerInfo = null;

  show(callback) {
    this.#callback = callback;
    const mainspaceElement = document.querySelector(".js-container");
    mainspaceElement.innerHTML = `
      <h2>Finished flying?</h2>
      <h3>Are you sure your want to remove channel?</h3>
      <p></p>
      ${getGlobalHtmlStatus()}
      <nav>
        <a class="btn js-remove-channel">Remove</a>
        <a class="btn js-remove-channel-cancel">Cancel</a>
      </nav>
    `;

    this.#removeListenerInfo = this.registerListener('.js-remove-channel',
      this.buttonRemoveChannelListener);
    this.#cancelListenerInfo = this.registerListener('.js-remove-channel-cancel',
      this.buttonCancelChannelListener);
  }

  buttonRemoveChannelListener() {
    this.removeEventListeners();
    deleteFireStoreUserData(this.showRemovedFromDatabase.bind(this));
  }

  buttonCancelChannelListener() {
    this.removeEventListeners();
    this.#callback();
  }

  removeEventListeners() {
    this.unRegisterListener(this.#removeListenerInfo);
    this.unRegisterListener(this.#cancelListenerInfo);

    this.#removeListenerInfo = null;
    this.#cancelListenerInfo = null;
  }

  showRemovedFromDatabase() {
    const html = '<h2>Channel information removed from database.</h2>';
    this.showOk(html, this.#callback);
  }
}