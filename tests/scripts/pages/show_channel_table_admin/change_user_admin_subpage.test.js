import 'global-jsdom/register';
import { beforeEach, describe, expect, test} from 'vitest';
import { ChangeUserAdminSubPage } from '../../../../public/scripts/pages/show_channel_table_admin/change_user_admin_subpage.js'
import { getFreqRadioButtonSelection } from '../../../../public/scripts/pages/enter_channel_page_helper';
import * as constant from '../../../../public/scripts/constants.js';
import {USER_MAIN_CHANNEL_LABEL, getTestUserInfo} from '../enter_channel_page_helper.test.js';

describe('Change user admin subpage test suite', () =>{
  beforeEach(() => {
    document.body.innerHTML = `
    <!DOCTYPE html>
    <body>
      <div class="js-container"></div>
    </body>`;
  });

  test('Test showFreqQuestion', ()=>{
    const userInfo = getTestUserInfo();
    const page = new ChangeUserAdminSubPage();

    page._setUserInfo(userInfo);
    page.showFreqQuestion(constant.DJI_O3);

    const label = getFreqRadioButtonSelection();
    expect(label).toBe(USER_MAIN_CHANNEL_LABEL);
  });
});