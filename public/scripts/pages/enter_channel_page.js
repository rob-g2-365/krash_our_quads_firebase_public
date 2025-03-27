import { Page } from './page.js';
import { getGlobalUserInfo, getGlobalHtmlStatus} from '../user_info.js';
import * as constant from '../constants.js';
import { setLocalStoreGoggleType, setLocalStoreChannelLabel } from '../local_storage.js';
import {
  CLASS_FREQ_QUESTION, CLASS_FREQ_RADIO_BUTTONS_DIV, CLASS_FREQ_QUESTION_NOTES,displayFreqQuestion, displayFreqQuestionNotes, displayFreqRadioButtons, 
  getCheckedGogglesRadioButton, gogglesRadioButtonGroup,
  getFreqRadioButtonSelection, setDefaultFreqSelection, setDefaultGogglesType, 
  validateGoggleRadioButtonChecked, 
} from './enter_channel_page_helper.js';
import { getDatabase } from '../database.js';

export class EnterChannelPage extends Page {
  #callback = null;
  #saveListenerInfo = null;
  #cancelListenerInfo = null;

  show(callback) {
    this.#callback = callback;
    const html = `
    <h3>What type of goggles/video transmitter do you have?</h1>
    <div class="left-radio-div">
      ${gogglesRadioButtonGroup()}
    </div>
    `;

    this.showOkCancelValidate(html, this.buttonGogglesOkEventListener.bind(this), 
    validateGoggleRadioButtonChecked,
      this.buttonGogglesCancelEventListener);

    setDefaultGogglesType(getGlobalUserInfo());
  }

  buttonGogglesOkEventListener(event) {
    const gogglesType = getCheckedGogglesRadioButton();
    if (gogglesType !== null) {
      setLocalStoreGoggleType(gogglesType);
      // Next Step
      this.showFreqQuestion(gogglesType);
    }
  }

  buttonGogglesCancelEventListener(event) {
    this.#callback();
  }

  showFreqQuestion(goggleType) {
    const goggleRecord = constant.goggleToGoggleRecord(goggleType);
    const mainspaceElement = document.querySelector(".js-container");
    mainspaceElement.innerHTML = `
      <h3 class=${CLASS_FREQ_QUESTION}> </h3>
      <div class="${CLASS_FREQ_RADIO_BUTTONS_DIV} left-radio-div">
      </div>
      <nav>
        <a class="btn js-button-freq-save" data-goggle-type="${goggleType}">Save</a>
        <a class="btn js-button-freq-cancel" data-goggle-type="${goggleType}">Cancel</a>
      </nav>
      <p class="${CLASS_FREQ_QUESTION_NOTES}"></p>
    `;
    displayFreqQuestion(goggleRecord);
    displayFreqRadioButtons(goggleRecord);
    displayFreqQuestionNotes(goggleRecord);
    setDefaultFreqSelection(getGlobalUserInfo());
    this.#saveListenerInfo = this.registerListener('.js-button-freq-save',
      this.buttonFreqSaveEventListener);
    this.#cancelListenerInfo = this.registerListener('.js-button-freq-cancel',
      this.buttonFreqCancelEventListener);
  }

  buttonFreqSaveEventListener(event) {
    const label = getFreqRadioButtonSelection();

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
    getDatabase().writeUserData(this.showSavedFreqState.bind(this), getGlobalUserInfo());
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