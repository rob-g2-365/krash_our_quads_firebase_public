import { Page } from './page.js';
import { getGlobalUserInfo, setGlobalUserInfo } from '../user_info.js';
import { setAdminMode, isAdminMode } from '../meeting_id_auth.js';

export class MeetingIdLogoutPage extends Page {
  show(callback) {
    let html;
    if (isAdminMode()) {
      html = '<h2>Administrator logged out.</h2>';
    } else {
      html = `<h2>User "${getGlobalUserInfo().getName()}" logged out.</h2>`;
    }
    this.showOk(html, callback);
    setGlobalUserInfo(null);
    setAdminMode(false);
  }
}