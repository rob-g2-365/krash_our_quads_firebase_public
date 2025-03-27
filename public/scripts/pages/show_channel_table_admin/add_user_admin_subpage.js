import * as constant from '../../constants.js'
import { BasePage, CLASS_BUTTON_OK, CLASS_BUTTON_CANCEL } from '../base_page.js';
import { UserInfo } from '../../user_info.js';
import { validateUserName } from '../../helper.js';
import { getDatabase } from '../../database.js';

const ID_NAME = 'id-name';

export class AddUserAdminSubPage extends BasePage {
  #callback = null;
  #okListenerInfo = null;
  #cancelListenerInfo = null;

  show(callback, aChannel) {
    this.#callback = callback;
    const mainspaceElement = document.querySelector(".js-container");

    mainspaceElement.innerHTML = `
    <h2>Add User Admin</h2>
    <div>
      <label for="${ID_NAME}">Name:</label>
      <input type="text" id="${ID_NAME}" name="${ID_NAME}" minlength=3 maxlength=10></input>   
    </div>
    <p style="padding-top:10px">Goggles Type?</p>      
    <div class="left-radio-div">
      ${this.goggleRadioButtons(aChannel)}
    </div>
    <nav>
      <a class="btn ${CLASS_BUTTON_OK}">OK</a>
      <a class="btn ${CLASS_BUTTON_CANCEL}">Cancel</a>
    </nav>
    `;

    this.#okListenerInfo = this.registerListener('.' + CLASS_BUTTON_OK, this.okPressed.bind(this));
    this.#cancelListenerInfo = this.registerListener('.' + CLASS_BUTTON_CANCEL, this.cancelPressed.bind(this));
  }

  goggleRadioButtons(aChannel) {
    const gogglesAndChannelLabelArray = getGogglesChannelLabelForAChannel(aChannel);
    let html = '';
    gogglesAndChannelLabelArray.forEach((goggleAndChannelLabel) => {
      html += this.goggleRadioButton(goggleAndChannelLabel);
    });
    return html;
  }

  goggleRadioButton(goggleAndChannelLabel) {
    const type = goggleAndChannelLabel.type;
    const name = goggleAndChannelLabel.name;
    const label = goggleAndChannelLabel.label;

    const disabledRadioHtml = label ? '' : 'disabled';
    const disableLabelHtml = label ? '' : 'style="color:gray;"';
    const labelText = label ? `(${label})` : '';
    const dataset = label ? `data-channel-label="${label}"` : '';


    const html = `
      <div>
        <input type="radio" name="goggles-type" id="${type}" value="${type}" ${dataset} ${disabledRadioHtml}> </input>
        <label for="${type}" class="js-goggles-type" ${disableLabelHtml}>${name} ${labelText}</label> 
      </div>`;
    return html;
  }

  okPressed() {
    const goggle = this.getCheckedGogglesRadioButton();
    const userName = document.getElementById(ID_NAME).value;

    // Make sure that a goggle has been selected.
    if (!goggle) {
      return;
    }

    // Return if userName is not valid.
    if (!validateUserName(userName) || userName === 'admin') {
      return;
    }

    const goggleRecord = constant.goggleToGoggleRecord(goggle.goggleType);
    const freqRecord = constant.getFreqSelection(goggleRecord, goggle.channelLabel);
    const userInfo = new UserInfo();

    userInfo.setName(userName);
    userInfo.setGoggleType(goggle.goggleType);
    userInfo.setUsingFreqRecord(freqRecord);

    this.unRegisterListener(this.#okListenerInfo);
    this.unRegisterListener(this.#cancelListenerInfo);

    getDatabase().writeUserData(this.#callback.bind(this), userInfo);
  }

  cancelPressed() {
    this.unRegisterListener(this.#okListenerInfo);
    this.unRegisterListener(this.#cancelListenerInfo);
    this.#callback();
  }

  getCheckedGogglesRadioButton() {
    for (let i = 0; i < constant.GOGGLE_TYPES.length; i++) {
      const goggleType = constant.GOGGLE_TYPES[i];
      const element = document.getElementById(goggleType);
      if (element.checked) {
        return { goggleType, channelLabel: element.dataset.channelLabel };
      }
    }
    return null;
  }

  registerListener(className, memberListener) {
    const element = document.querySelector(className);
    const bind = memberListener.bind(this);
    element.addEventListener('click', bind);
    return { element, bind };
  }

  unRegisterListener(listenerInfo) {
    if (listenerInfo) {
      listenerInfo.element.removeEventListener('click', listenerInfo.bind);
    }
  }

}

function getGogglesChannelLabelForAChannel(aChannel) {
  // Want an array of tuple of goggle, channel label.
  const array = [];
  constant.GOGGLE_RECORDS.forEach((goggleRecord) => {
    const freq = goggleRecord.freqMap.find((record) => {
      return record.achannel == aChannel;
    });


    const type = goggleRecord.type
    const name = goggleRecord.name;
    const label = freq ? freq.label : null;
    array.push({ type, name, label });
  });

  return array;
}
