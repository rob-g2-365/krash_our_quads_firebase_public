import { Page } from './page.js';
import { getGlobalUserInfo, getGlobalHtmlStatus } from '../user_info.js';
import * as constant from '../constants.js';
import { getLocalStoreGoggleType, setLocalStoreGoggleType, getLocalStoreChannelLabel, setLocalStoreChannelLabel } from '../local_storage.js';
import { writeFireStoreUserData } from '../firebase_database.js';

const RADIO_FREQ_NAME = 'radio-freq-name';

export class EnterChannelPage extends Page {
  #callback = null;
  #saveListenerInfo = null;
  #cancelListenerInfo = null;

  show(callback) {
    this.#callback = callback;
    const html = `
    <h3>What type of goggles/video transmitter do you have?</h1>
    <div class="left-radio-div">
      ${this.gogglesRadioButtonGroup()}
    </div>
    `;
    this.showOkCancel(html, this.buttonGogglesOkEventListener.bind(this),
      this.buttonGogglesCancelEventListener);

    this.setDefaultGogglesType();
  }

  gogglesRadioButtonGroup() {
    return constant.GOGGLES_RECORDS.map(this.goggleRadioButton.bind(this)).join('');
  }

  goggleRadioButton(goggle) {
    const html = `
    <div>
      <input type="radio" name="goggles-type" id="${goggle.type}" value="${goggle.type}">
      <label for="${goggle.type}" class="js-goggles-type">${goggle.name}</label>
    </div>`;
    return html;
  }


  setDefaultGogglesType() {
    const userInfo = getGlobalUserInfo();

    // Check if the goggles is in the database, if not see if it is in local storage.
    const defaultGoggleType = userInfo.getGoggleType() || getLocalStoreGoggleType();
    if (defaultGoggleType) {
      const element = document.getElementById(defaultGoggleType);
      element.checked = true;
    }
  }

  buttonGogglesOkEventListener(event) {
    const gogglesType = this.getCheckedGogglesRadioButton();
    if (gogglesType !== null) {
      setLocalStoreGoggleType(gogglesType);
      // Next Step
      this.showFreqQuestion(gogglesType);
    }
  }

  getCheckedGogglesRadioButton() {
    for (let i = 0; i < constant.GOGGLE_TYPES.length; i++) {
      const goggle = constant.GOGGLE_TYPES[i];
      const element = document.getElementById(goggle);
      if (element.checked) {
        return goggle;
      }
    }
    return null;
  }

  buttonGogglesCancelEventListener(event) {
    this.#callback();
  }

  showFreqQuestion(goggleType) {
    const goggleRecord = constant.goggleToGoggleRecord(goggleType);
    const mainspaceElement = document.querySelector(".js-container");
    mainspaceElement.innerHTML = `
      <h3 class=js-freq-question> </h3>
      <div class="js-freq-radio-buttons-div left-radio-div">
      </div>
      <nav>
        <a class="btn js-button-freq-save" data-goggle-type="${goggleType}">Save</a>
        <a class="btn js-button-freq-cancel" data-goggle-type="${goggleType}">Cancel</a>
      </nav>
      <p class="js-freq-question-notes question-notes"></p>
    `;
    this.displayQuestion(goggleRecord);
    this.displayRadioButtons(goggleRecord);
    this.displayQuestionNotes(goggleRecord);
    this.setDefaultFreqSelection();
    this.#saveListenerInfo = this.registerListener('.js-button-freq-save',
      this.buttonFreqSaveEventListener);
    this.#cancelListenerInfo = this.registerListener('.js-button-freq-cancel',
      this.buttonFreqCancelEventListener);
  }

  buttonFreqSaveEventListener(event) {
    const label = this.radioButtonSelection();

    // Make sure that the user did a selection.
    if (!label) {
      return;
    }
    this.removeFreqEventListeners();

    // Save the default to local storage.
    setLocalStoreChannelLabel(label);

    const goggleType = event.target.dataset.goggleType;
    const goggleRecord = constant.goggleToGoggleRecord(goggleType);
    const freqRecord = constant.getFreqSelection(goggleRecord, label);

    getGlobalUserInfo().setGoggleType(goggleType);
    getGlobalUserInfo().setUsingFreqRecord(freqRecord);
    writeFireStoreUserData(this.showSavedFreqState.bind(this));
  }

  displayQuestion(goggleRecord) {
    const questionElement = document.querySelector('.js-freq-question');
    questionElement.innerHTML = goggleRecord.question;
  }

  displayQuestionNotes(goggleRecord) {
    const questionNotesElement = document.querySelector('.js-freq-question-notes');
    questionNotesElement.innerHTML = goggleRecord.notes;
  }

  displayRadioButtons(goggleRecord) {
    const questionRadioDivElement = document.querySelector('.js-freq-radio-buttons-div');
    const freqMap = goggleRecord.freqMap;
    let radioButtonComposite = '';
    freqMap.forEach((channelInfo) => {
      const radioId = channelInfo.label;
      const selection = channelInfo.name;
      const radioButtonHtml = `<input type="radio" name="${RADIO_FREQ_NAME}" ` +
        `id="${radioId}" value="${radioId}"/>`;
      const labelHtml = `<label for="${radioId}">${selection}</label>`;
      radioButtonComposite += '<div>' + radioButtonHtml + labelHtml + '</div>';
    });
    questionRadioDivElement.innerHTML = radioButtonComposite;
  }

  setDefaultFreqSelection() {
    const userInfo = getGlobalUserInfo();

    // Check if the channel label is in the database, if not see if it is in local storage.
    // If no defaults exist just return.
    const defaultLabel = userInfo.getChannelLabel() || getLocalStoreChannelLabel();
    if (!defaultLabel) {
      return;
    }

    const element = document.getElementById(defaultLabel);

    // The user could have used a different goggle type the last time. 
    // Check to make sure that the element exists.
    if (element) {
      element.checked = true;
    }
  }

  radioButtonSelection() {
    const element = document.getElementsByName(RADIO_FREQ_NAME);
    for (let i = 0; i < element.length; i++) {
      if (element[i].checked) {
        return element[i].value;
      }
    }
    return null;
  }

  removeFreqEventListeners() {
    this.unRegisterListener(this.#saveListenerInfo);
    this.#saveListenerInfo = null;
    this.unRegisterListener(this.#cancelListenerInfo);
    this.#cancelListenerInfo = null;
  }

  buttonFreqCancelEventListener(event) {
    this.removeFreqEventListeners();
    this.#callback();
  }

  showSavedFreqState() {
    const html = `
    <h2>Saved to database.</h2>
    <p>Check the <b>Show Allocated Channels</b> and coordinate with other users who are on the frequency before flying.</p>
    <p></p>
    ${getGlobalHtmlStatus()}
    `;
    this.showOk(html, this.#callback);
  }
}