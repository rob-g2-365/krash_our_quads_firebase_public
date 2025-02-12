import { Page } from './page.js';
import { writeFireStoreMeetingHash } from '../firebase_database.js';
import { setMeetingId, cyrb53 } from '../meeting_id_auth.js';

const ID_MEETING = 'change-meeting-id';

export class ChangeMeetingIdPage extends Page {
  #callback = null;
  #listenerInfoSave = null;
  #listenerInfoCancel = null;
  #newMeetingId = null;

  show(callback) {
    this.#callback = callback;
    this.#newMeetingId = null;
    const mainspaceElement = document.querySelector(".js-container");
    mainspaceElement.innerHTML = `
      <h2>Change Meeting ID</h2>
      <p>Enter the new meeting id.</p>
      <div>
        <label for="${ID_MEETING}">Meeting ID:</label>
        <input type="text" id="${ID_MEETING}" name="${ID_MEETING}" minlength=6 maxlength=6></input>
      </div>
      <nav>
        <a class="btn js-btn-save">Save</a>
        <a class="btn js-btn-cancel">Cancel</a>
      </nav>
      `;
    this.#listenerInfoSave = this.registerListener('.js-btn-save',
      this.#listenerSaveMeetingIdButton);
    this.#listenerInfoCancel = this.registerListener('.js-btn-cancel',
      this.#listenerCancelMeetingIdButton);

  }
  #listenerSaveMeetingIdButton() {
    this.#newMeetingId = document.getElementById(ID_MEETING).value;
    const hash = cyrb53(this.#newMeetingId);
    setMeetingId(this.#newMeetingId);
    this.#unRegisterAllListeners();
    writeFireStoreMeetingHash(this.showMeetingChanged.bind(this), hash);
  }

  #listenerCancelMeetingIdButton() {
    this.#unRegisterAllListeners();
    this.#callback();
  }

  #unRegisterAllListeners() {
    this.unRegisterListener(this.#listenerInfoSave);
    this.unRegisterListener(this.#listenerInfoCancel);
    this.#listenerInfoSave = null;
    this.#listenerInfoCancel = null;
  }

  showMeetingChanged() {
    const html = `<h2>Meeting ID has changed to ${this.#newMeetingId}.</h2>`;
    this.showOk(html, this.#callback);
  }
}