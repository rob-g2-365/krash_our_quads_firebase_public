import { getGlobalUserInfo, getArrayOfUsers } from '../user_info.js';
import { isAdminMode } from '../meeting_id_auth.js';
import * as constant from '../constants.js';
import { getLocalStoreGoggleType, getLocalStoreChannelLabel } from '../local_storage.js';

export const RADIO_FREQ_NAME = 'radio-freq-name';
export const CLASS_FREQ_QUESTION = 'js-freq-question';
export const CLASS_FREQ_RADIO_BUTTONS_DIV = 'js-freq-radio-buttons-div';
export const CLASS_FREQ_QUESTION_NOTES = 'js-freq-question-notes';


export function displayFreqQuestion(goggleRecord) {
  const questionElement = document.querySelector('.' + CLASS_FREQ_QUESTION);
  questionElement.innerHTML = goggleRecord.question;
}

export function displayFreqQuestionNotes(goggleRecord) {
  const questionNotesElement = document.querySelector('.' + CLASS_FREQ_QUESTION_NOTES);
  questionNotesElement.innerHTML = goggleRecord.notes;
}

export function displayFreqRadioButtons(goggleRecord) {
  const questionRadioDivElement = document.querySelector('.' + CLASS_FREQ_RADIO_BUTTONS_DIV);
  const freqMap = goggleRecord.freqMap;
  let radioButtonComposite = '';
  freqMap.forEach((channelInfo) => {
    const radioId = channelInfo.label;
    const aChannel = channelInfo.achannel;
    const numUserTxt = isAdminMode() ? numUserTextAdmin(aChannel) : numUserText(aChannel);
    const selection = channelInfo.name + '  ' + numUserTxt;
    const radioButtonHtml = `<input type="radio" name="${RADIO_FREQ_NAME}" ` +
      `id="${radioId}" value="${radioId}"/>`;
    const labelHtml = `<label for="${radioId}">${selection}</label>`;
    radioButtonComposite += '<div>' + radioButtonHtml + labelHtml + '</div>';
  });
  questionRadioDivElement.innerHTML = radioButtonComposite;
}

export function numUserTextAdmin(aChannel) {
  const numUsers = getArrayOfUsers().filter((user) => {
    return (user.getAChannel() === aChannel);
  }).length;

  if (numUsers == 0) {
    return '';
  } else if (numUsers == 1) {
    return '(1 User)';
  } else {
    return `(${numUsers} Users)`;
  }
}

// channelInfo - Current channel being displayed.
export function numUserText(aChannel) {
  const userName = getGlobalUserInfo().getName();
  const numUsers = getArrayOfUsers().filter((user) => {
    return (userName !== user.getName() &&
      user.getAChannel() === aChannel);
  }).length;

  if (numUsers == 0) {
    return '';
  } else if (numUsers == 1) {
    return '(1 User)';
  } else {
    return `(${numUsers} Users)`;
  }
}

export function getFreqRadioButtonSelection() {
  const element = document.getElementsByName(RADIO_FREQ_NAME);
  for (let i = 0; i < element.length; i++) {
    if (element[i].checked) {
      return element[i].value;
    }
  }
  return null;
}

export function gogglesRadioButtonGroup() {
  return constant.GOGGLE_RECORDS.map(goggleRadioButton).join('');
}

export function goggleRadioButton(goggle) {
  const html = `
  <div>
    <input type="radio" name="goggles-type" id="${goggle.type}" value="${goggle.type}">
    <label for="${goggle.type}" class="js-goggles-type">${goggle.name}</label>
  </div>`;
  return html;
}

export function setDefaultGogglesType(userInfo) {
  // Check if the goggles is in the database, if not see if it is in local storage.
  const localStorageGoggleType = isAdminMode() ? null : getLocalStoreGoggleType();
  const defaultGoggleType = userInfo.getGoggleType() || localStorageGoggleType;
  if (defaultGoggleType) {
    const element = document.getElementById(defaultGoggleType);
    if (element) {
      element.checked = true;
    }
  }
}

export function setDefaultFreqSelection(userInfo) {
  // Check if the channel label is in the database, if not see if it is in local storage.
  // If no defaults exist just return.
  const localStorageChannelLabel = isAdminMode() ? null : getLocalStoreChannelLabel();
  const defaultLabel = userInfo.getChannelLabel() || localStorageChannelLabel;
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


export function getCheckedGogglesRadioButton() {
  for (let i = 0; i < constant.GOGGLE_TYPES.length; i++) {
    const goggle = constant.GOGGLE_TYPES[i];
    const element = document.getElementById(goggle);
    if (element.checked) {
      return goggle;
    }
  }
  return null;
}

export function validateGoggleRadioButtonChecked() {
  const gogglesType = getCheckedGogglesRadioButton();
  return gogglesType !== null;
}


