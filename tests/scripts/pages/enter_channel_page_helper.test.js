import 'global-jsdom/register';
import { beforeEach, describe, expect, test} from 'vitest';
import {
  CLASS_FREQ_QUESTION, CLASS_FREQ_RADIO_BUTTONS_DIV, CLASS_FREQ_QUESTION_NOTES,
  displayFreqRadioButtons,
  displayFreqQuestion, displayFreqQuestionNotes,
  getCheckedGogglesRadioButton, getFreqRadioButtonSelection,
  goggleRadioButton, gogglesRadioButtonGroup,
  numUserText, numUserTextAdmin,
  setDefaultGogglesType,
  setDefaultFreqSelection,
  validateGoggleRadioButtonChecked} from '../../../public/scripts/pages/enter_channel_page_helper.js'
import { UserInfo, setArrayOfUsers, setGlobalUserInfo } from '../../../public/scripts/user_info.js';
import * as constant from '../../../public/scripts/constants.js';

export const USER_MAIN_NAME = 'MainUser';
export const USER_MAIN_CHANNEL_LABEL = 'dji-O3-ch4';

const USER1_NAME = 'Test1';
const USER1_RECORD = {name: USER1_NAME, aChannel: 4, channel:4, googleType: constant.ANALOG, channelLabel:'a-ch4'};

const USER2_NAME = 'Test2';
const USER2_RECORD = {name: USER2_NAME, aChannel: 4, channel:4, googleType: constant.WALKSNAIL, channelLabel:'walk-ch4'};

export const GOGGLE_TYPE = constant.DJI_O3;

describe('Enter channel page helper test suite', () =>{
  beforeEach(() => {
    document.body.innerHTML = `
    <!DOCTYPE html>
    <body>
      <div class="js-container"></div>
    </body>`;

  });

  test('DOM initialized', ()=>{
    expect(document).toBeTruthy();
  });

  test('Test numUserText - Free',() => {
    const userArray = [];
    const userInfo = getTestUserInfo();
    setGlobalUserInfo(userInfo);
    setArrayOfUsers(userArray);
    expect(numUserText(3)).toBe('');
  });

  test('Test numUserText - 1 User',() => {   
    const userArray = [USER1_RECORD];
    const userInfo = getTestUserInfo();
    setGlobalUserInfo(userInfo);
    setArrayOfUsers(userArray);
    expect(numUserText(4)).toBe('(1 User)');
  });

  test('Test numUserText - 2 User',() => {   
    const userArray = [USER1_RECORD, USER2_RECORD];
    const userInfo = getTestUserInfo();
    setGlobalUserInfo(userInfo);
    setArrayOfUsers(userArray);
    expect(numUserText(4)).toBe('(2 Users)');
  });

  test('Test numUserTextAdmin - Free User', () => {
    const userArray = [];
    setGlobalUserInfo(null);
    setArrayOfUsers(userArray);
    expect(numUserTextAdmin(3)).toBe('');
  });

  test('Test numUserTextAdmin - 1 User',() => {   
    const userArray = [USER1_RECORD];
    setGlobalUserInfo(null);
    setArrayOfUsers(userArray);
    expect(numUserTextAdmin(4)).toBe('(1 User)');
  });

  test('Test numUserTextAdmin - 2 User',() => {   
    const userArray = [USER1_RECORD, USER2_RECORD];
    setGlobalUserInfo(null);
    setArrayOfUsers(userArray);
    expect(numUserTextAdmin(4)).toBe('(2 Users)');
  });

  test('Test goggleRadioButton', ()=> {
    const goggleRecord = constant.goggleToGoggleRecord(constant.WALKSNAIL);
    const html = goggleRadioButton(goggleRecord);
    expect(html).toContain('class="js-goggles-type"');
    expect(html).toContain(`id="${goggleRecord.type}"`);
    expect(html).toContain(`value="${goggleRecord.type}"`);
    expect(html).toContain(`label for="${goggleRecord.type}"`);
  });

  test('Test gogglesRadioButtonGroup', ()=> {
    const html = gogglesRadioButtonGroup();
    constant.GOGGLE_RECORDS.forEach((goggleRecord)=>{
      expect(html).toContain(`id="${goggleRecord.type}"`);
      expect(html).toContain(`value="${goggleRecord.type}"`);
      expect(html).toContain(`label for="${goggleRecord.type}"`);
      });    
  });

  test(' Test get/setDefaultGogglesType', () =>{
    const userInfo = getTestUserInfo();
    
    initializeGoggleQuestion();
    setDefaultGogglesType(userInfo);
    const goggleType = getCheckedGogglesRadioButton();
    expect(goggleType).toBe(userInfo.getGoggleType());
    expect(validateGoggleRadioButtonChecked()).toBe(true);
  });

  test('Test get/setDefaultFreqSelection', ()=>{
    const userInfo = getTestUserInfo();
    setGlobalUserInfo(userInfo);

    initializeFreqQuestion();
    const goggleRecord = constant.goggleToGoggleRecord(constant.DJI_O3);
    displayFreqRadioButtons(goggleRecord);
    setDefaultFreqSelection(userInfo);

    const label = getFreqRadioButtonSelection();
    expect(label).toBe(USER_MAIN_CHANNEL_LABEL);
  });

  test('Test displayFreqQuestion and displayFreqQuestionNotes', () => {
    const goggleRecord = constant.goggleToGoggleRecord(constant.WALKSNAIL);
    initializeFreqQuestion();
    displayFreqQuestion(goggleRecord);
    displayFreqQuestionNotes(goggleRecord);
    expect(document.querySelector('.js-container').innerHTML).toContain(goggleRecord.question);
    expect(document.querySelector('.js-container').innerHTML).toContain(goggleRecord.notes);
  });

});

export function getTestUserInfo() {
  const goggleRecord = constant.goggleToGoggleRecord(constant.DJI_O3);
  const freqRecord = constant.getFreqSelection(goggleRecord, USER_MAIN_CHANNEL_LABEL);

  const userInfo = new UserInfo();
  userInfo.setName(USER_MAIN_NAME).setGoggleType(constant.DJI_O3).setUsingFreqRecord(freqRecord);
  return userInfo;
}

function initializeGoggleQuestion() {
  const mainspaceElement = document.querySelector(".js-container");
  mainspaceElement.innerHTML = `
    <h3>What type of goggles/video transmitter do you have?</h1>
    <div class="left-radio-div">
      ${gogglesRadioButtonGroup()}
    </div>
    `;
}
function initializeFreqQuestion() {
  const mainspaceElement = document.querySelector(".js-container");
  mainspaceElement.innerHTML = `
    <h3 class=${CLASS_FREQ_QUESTION}> </h3>
    <div class="${CLASS_FREQ_RADIO_BUTTONS_DIV} left-radio-div"></div>
    <nav>
      <a class="btn js-button-freq-save" data-goggle-type="${GOGGLE_TYPE}">Save</a>
      <a class="btn js-button-freq-cancel" data-goggle-type="${GOGGLE_TYPE}">Cancel</a>
    </nav>
    <p class="${CLASS_FREQ_QUESTION_NOTES}"></p>
  `;
}

