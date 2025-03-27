import 'global-jsdom/register';
import { beforeEach, describe, expect, test } from 'vitest';
import { RemoveChannelPage } from '../../../public/scripts/pages/remove_channel_page.js';
import { setGlobalUserInfo } from '../../../public/scripts/user_info.js';
import { getTestUserInfo} from './enter_channel_page_helper.test.js';
import { getDatabase, initializeDatabase } from '../../../public/scripts/database.js';
import { DatabaseMock } from '../database_mock.js';


describe('Remove Channel Page Test Suite', () =>{
  beforeEach(() => {
    document.body.innerHTML = '<!DOCTYPE html><body><div class="js-container"></div></body>';
  });

  test('Test that the about page is shown.',() => {
    const userInfo = getTestUserInfo();    
    setGlobalUserInfo(userInfo);

    initializeDatabase(new DatabaseMock());
    getDatabase().writeUserData(()=>{}, userInfo);

    const page = new RemoveChannelPage();
    page.show(null);
    const element = document.querySelector('.js-remove-channel');
    element.click();

    getDatabase().readAllChannels((records)=>{
      expect(records.length).toBe(0);
    });
  });
});
