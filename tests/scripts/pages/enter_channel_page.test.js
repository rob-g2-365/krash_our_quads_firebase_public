import 'global-jsdom/register';
import { beforeEach, describe, expect, test} from 'vitest';
import { EnterChannelPage } from '../../../public/scripts/pages/enter_channel_page.js';
import { getFreqRadioButtonSelection } from '../../../public/scripts/pages/enter_channel_page_helper';
import * as constant from '../../../public/scripts/constants.js';
import { setGlobalUserInfo } from '../../../public/scripts/user_info.js';
import {USER_MAIN_CHANNEL_LABEL, getTestUserInfo} from './enter_channel_page_helper.test.js';

describe('enter channel page test', () =>{
  beforeEach(() => {
    document.body.innerHTML = `
    <!DOCTYPE html>
    <body>
      <div class="js-container"></div>
    </body>`;
  });

  test('Test showFreqQuestion', ()=>{
    const userInfo = getTestUserInfo();
    setGlobalUserInfo(userInfo);

    const page = new EnterChannelPage();
    page.showFreqQuestion(constant.DJI_O3);
    const label = getFreqRadioButtonSelection();
    expect(label).toBe(USER_MAIN_CHANNEL_LABEL);
  });
});