import { Page } from './page.js';
import { verifyMeetingId, verifyAdmin, setAdminMode } from '../meeting_id_auth.js';
import { getLocalStoreName, setLocalStoreName, getLocalStoreMeetingId, setLocalStoreMeetingId } from '../local_storage.js';
import { UserInfo, getGlobalUserInfo, setGlobalUserInfo } from '../user_info.js';
import { readFireStoreUserData } from '../firebase_database.js';
import {validateUserName, isAscii} from '../helper.js';

const ID_NAME = 'id-name';
const ID_MEETING = 'meeting-id';

export class MeetingIdLoginPage extends Page {
  #callback = null;
  #loginListenerInfo = null;
  #cancelListenerInfo = null;
  #nameInputListenerInfo = null;
  #meetingIdInputListenerInfo = null;

  show(callback) {
    this.#callback = callback;
    const mainspaceElement = document.querySelector(".js-container");
    mainspaceElement.innerHTML = `
      <h1>Login Screen</h1>
      <p>Enter your name and the meeting id.</p>
      <br/>
      <table>
        <tr>
          <td> <label class="input-label" for="${ID_NAME}">Name:</label> </td>
          <td> <input type="text" id="${ID_NAME}" name="${ID_NAME}" minlength=3 maxlength=10></input> </td>
        </tr>
        <tr>
          <td> <label class="input-label" for="${ID_MEETING}">Meeting ID:</label> </td>
          <td> <input type="text" id="${ID_MEETING}" name="${ID_MEETING}" minlength=6 maxlength=6></input> </td>
        </tr>
      </table>
      <br/>
      <p>Note: First name and last initial is enough.</p>
      <nav>
        <a class="btn js-btn-login">Login</a>
        <a class="btn js-btn-cancel">Cancel</a>
      </nav>
    `;
    this.setDefaultsFromLocalStore();
    this.#loginListenerInfo = this.registerListener('.js-btn-login', this.listenerLoginButton);
    this.#cancelListenerInfo = this.registerListener('.js-btn-cancel',this.listenerCancelButton);

    this.#nameInputListenerInfo = this.registerInputById(ID_NAME, this.validateInput);
    this.#meetingIdInputListenerInfo = this.registerInputById(ID_MEETING, this.validateInput);
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
    const name = document.getElementById(ID_NAME).value;
    const meetingId = document.getElementById(ID_MEETING).value;

    // Return if name or meeting id is not valid.
    if ( !validateUserName(name) || !isAscii(meetingId)) {
      return;
    }

    if (verifyAdmin(name, meetingId)) {
      this.unRegisterAllListeners();
      setAdminMode(true);
      this.saveLocalStoreLoginInfo();
      this.showAdminLoggedIn();
    } else if (verifyMeetingId(name, meetingId)) {
      this.unRegisterAllListeners();

      // SaveName;
      const userInfo = new UserInfo();
      userInfo.setName(name);
      setGlobalUserInfo(userInfo);
      this.saveLocalStoreLoginInfo();
      readFireStoreUserData(this.showLoggedIn.bind(this));
    }
  }
  listenerCancelButton(event) {
    this.unRegisterAllListeners();
    this.#callback();
  }

  unRegisterAllListeners(){
    this.unRegisterListener(this.#loginListenerInfo);
    this.unRegisterListener(this.#cancelListenerInfo);
    this.unRegisterInputById(this.#nameInputListenerInfo);
    this.unRegisterInputById(this.#meetingIdInputListenerInfo);
  }

  saveLocalStoreLoginInfo() {
    setLocalStoreName(document.getElementById(ID_NAME).value);
    setLocalStoreMeetingId(document.getElementById(ID_MEETING).value);
  }

  showAdminLoggedIn() {
    this.showOk('<h2>Administrator is logged in.</h2>', this.#callback);
  }

  showLoggedIn(json) {
    const name = getGlobalUserInfo().getName();
    if(json) {
      getGlobalUserInfo().setDataBaseRecord(json);
    }
    this.showOk(`<h2>User ${name} is logged in.</h2>`, this.#callback);
  }

  validateInput(event){
    const target = event.target;
    const name = target.value;
  
    if(isAscii(name)) {
      target.style.borderColor = 'black';
      target.style.borderBlockWidth = '0px';
    } else {
      target.style.borderColor = 'red';
      target.style.borderBlockWidth = '2px';
    }
  }
}

