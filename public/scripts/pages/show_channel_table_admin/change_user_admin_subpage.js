
import { BasePage } from '../base_page.js';
import {UserInfo} from '../../user_info.js';
import { 
  CLASS_FREQ_QUESTION, CLASS_FREQ_RADIO_BUTTONS_DIV,
  displayFreqQuestion, displayFreqRadioButtons, 
  getCheckedGogglesRadioButton, gogglesRadioButtonGroup,
  getFreqRadioButtonSelection, setDefaultFreqSelection, setDefaultGogglesType, 
  validateGoggleRadioButtonChecked,   
} from '../enter_channel_page_helper.js'
import * as constant from '../../constants.js';
import { getDatabase } from '../../database.js';

export class ChangeUserAdminSubPage extends BasePage {
  #callback;
  #userInfo;
  #saveListenerInfo = null;
  #cancelListenerInfo = null;

  show(callback, userInfo) {
    this.#callback = callback;
    this.#userInfo = userInfo;
    const html = `
      <h3>Enter goggles/video transmitter for "${userInfo.getName()}"?</h1>
      <div class="left-radio-div">
        ${gogglesRadioButtonGroup()}
      </div>
      `;

    this.showOkCancelValidate(html, this.buttonGogglesOkEventListener.bind(this),
      validateGoggleRadioButtonChecked,
      this.buttonGogglesCancelEventListener);

    setDefaultGogglesType(userInfo);
  }

  buttonGogglesOkEventListener(event) {
    const gogglesType = getCheckedGogglesRadioButton();
    if (gogglesType !== null) {
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
        `;
    displayFreqQuestion(goggleRecord);
    displayFreqRadioButtons(goggleRecord);
    setDefaultFreqSelection(this.#userInfo);
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
      const goggleType = event.target.dataset.goggleType;
      const goggleRecord = constant.goggleToGoggleRecord(goggleType);
      const freqRecord = constant.getFreqSelection(goggleRecord, label);

      const newUserInfo = new UserInfo();
      newUserInfo.setName(this.#userInfo.getName());
      newUserInfo.setGoggleType(goggleType);
      newUserInfo.setUsingFreqRecord(freqRecord);
      getDatabase().writeUserData(this.#callback, newUserInfo);
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

    // Only used for testing.
    _setUserInfo(userInfo) {
      this.#userInfo = userInfo;
    }
}