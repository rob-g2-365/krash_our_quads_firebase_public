import { Page } from './page.js';
import { verifyMeetingId, verifyAdmin, setAdminMode } from '../meeting_id_auth.js';
import { getLocalStoreName, setLocalStoreName, getLocalStoreMeetingId, setLocalStoreMeetingId } from '../local_storage.js';
import { UserInfo, getGlobalUserInfo, setGlobalUserInfo } from '../user_info.js';
import { readFireStoreUserData } from '../firebase_database.js';

const ID_NAME = 'id-name';
const ID_MEETING = 'meeting-id';

export class MeetingIdLoginPage extends Page {
  #callback = null;
  #loginListenerInfo = null;
  #cancelListenerInfo = null;

  show(callback) {
    this.#callback = callback;
    const mainspaceElement = document.querySelector(".js-container");
    mainspaceElement.innerHTML = `
      <h1>Login Screen</h1>
      <p>Enter your name and the meeting id.</p>
      <div>
        <label for="${ID_NAME}">Name:</label>
        <input type="text" id="${ID_NAME}" name="${ID_NAME}" minlength=3 maxlength=10></input><br>
        <label for="${ID_MEETING}">Meeting ID:</label>
        <input type="text" id="${ID_MEETING}" name="${ID_MEETING}" minlength=6 maxlength=6></input>
      </div>
      <br>
      <p>Note: First name and last initial is enough.</p>
      <nav>
        <a class="btn js-btn-login">Login</a>
        <a class="btn js-btn-cancel">Cancel</a>
      </nav>
    `;
    this.setDefaultsFromLocalStore();
    this.#loginListenerInfo = this.registerListener('.js-btn-login', this.listenerLoginButton);
    this.#cancelListenerInfo = this.registerListener('.js-btn-cancel',this.listenerCancelButton);
  }

  setDefaultsFromLocalStore() {
    const localStoreName = getLocalStoreName();
    const localStoreMeetingId = getLocalStoreMeetingId();
    if (localStoreName) {
      document.getElementById(ID_NAME).value = localStoreName;
    }
    if (localStoreMeetingId) {
      document.getElementById(ID_MEETING).value = localStoreMeetingId;
    }
  }

  listenerLoginButton(event) {
    const uncleanName = document.getElementById(ID_NAME).value;
    const name = removeNonPrintableChars(uncleanName);
    const meetingId = document.getElementById(ID_MEETING).value;
    if (verifyAdmin(name, meetingId)) {
      this.unRegisterListener(this.#loginListenerInfo);
      this.unRegisterListener(this.#cancelListenerInfo);
      setAdminMode(true);
      this.showAdminLoggedIn();
    } else if (verifyMeetingId(meetingId)) {
      this.unRegisterListener(this.#loginListenerInfo);
      this.unRegisterListener(this.#cancelListenerInfo);

      // SaveName;
      const userInfo = new UserInfo();
      userInfo.setName(name);
      setGlobalUserInfo(userInfo);
      this.saveLocalStoreLoginInfo();
      readFireStoreUserData(this.showLoggedIn.bind(this));
    }
  }
  listenerCancelButton(event) {
    this.unRegisterListener(this.#loginListenerInfo);
    this.unRegisterListener(this.#cancelListenerInfo);
    this.#callback();
  }

  saveLocalStoreLoginInfo() {
    setLocalStoreName(document.getElementById(ID_NAME).value);
    setLocalStoreMeetingId(document.getElementById(ID_MEETING).value);
  }

  showAdminLoggedIn() {
    this.showOk('<h2>Administrator is logged in.</h2>', this.#callback);
  }

  showLoggedIn() {
    const name = getGlobalUserInfo().getName();
    this.showOk(`<h2>User ${name} is logged in.</h2>`, this.#callback);
  }
}

function removeNonPrintableChars(str) {
  return str.replace(/[^\x20-\x7E]/g, '').trim();
}