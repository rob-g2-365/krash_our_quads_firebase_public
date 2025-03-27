import 'global-jsdom/register';
import { beforeEach, describe, expect, test, vi} from 'vitest';
import { defaultUser1, defaultUser2, TEST_U1_NAME } from '../../user_info.test.js';
import {ShowChannelTableAdminPage} from '../../../../public/scripts/pages/show_channel_table_admin/show_channel_table_admin_page.js';

describe('Show channel table admin subpage test suite.', () =>{
  beforeEach(() => {
    document.body.innerHTML = `
    <!DOCTYPE html>
    <body>
      <input type="checkbox" class="toggler js-toggler">
      <div class="hamburger">
      </div>
      <div class="js-container"></div>
    </body>`;
  });

  test('Test verifyUserDataRelease correct', ()=>{
    const page = new ShowChannelTableAdminPage();
    page.userInfo = defaultUser1();

    const spy = vi.spyOn(page, 'showRemoveVerifiedScreen');
    page.verifyUserDataRelease(defaultUser1().getDataBaseRecord());
    expect(spy).toBeCalled();
    expect(document.body.innerHTML).toContain('Are you sure you want to remove this user?');   
  });

  test('Test verifyUserDataRelease user removed in another instance.', ()=>{
    const page = new ShowChannelTableAdminPage();
    page.userInfo = defaultUser1();

    const spy = vi.spyOn(page, 'userAlreadyRemoved');
    page.verifyUserDataRelease(null);
    expect(spy).toBeCalled();
    expect(document.body.innerHTML).toContain('channel has been removed from the database.');
  });

  test('Test verifyUserDataRelease user channel changed in another instance.', ()=>{
    const page = new ShowChannelTableAdminPage();
    page.userInfo = defaultUser1();
    const changedUserInfo = defaultUser2();
    console.log(changedUserInfo);
    changedUserInfo.setName(TEST_U1_NAME);

    const spy = vi.spyOn(page, 'userChannelHasChanged');
    page.verifyUserDataRelease(changedUserInfo.getDataBaseRecord());
    expect(spy).toBeCalled();
    expect(document.body.innerHTML).toContain('channel allocation has changed.');
  });
});