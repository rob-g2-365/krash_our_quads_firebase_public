import 'global-jsdom/register';
import { beforeEach, describe, expect, test } from 'vitest';
import { updateMenuState, intializeEventListeners, showHomeInformation } from '../../public/scripts/main_menu_handler.js'
import { UserInfo, setGlobalUserInfo } from '../../public/scripts/user_info.js';
import { setAdminMode } from '../../public/scripts/meeting_id_auth.js';
import { defaultUser1 } from './user_info.test.js';
import { DatabaseMock } from './database_mock.js';
import { initializeDatabase, getDatabase} from '../../public/scripts/database.js';

const HTML = `
  <div class="menu-wrap">
    <input type="checkbox" class="toggler js-toggler">
    <div class="hamburger">
      <div></div>
    </div>
    <div class="menu">
      <div>
        <div>
          <ul>
            <li class="js-menu-home"><a>Home</a></li>
            <li class="js-menu-login"><a>Log In</a></li>
            <li class="js-menu-logout"><a>Log Out</a></li>
            <li class="js-menu-enter-channel"><a>Enter VTX Channel</a></li>
            <li class="js-menu-change-channel"><a>Change VTX Channel</a></li>
            <li class="js-menu-remove-channel"><a>Remove VTX Channel</a></li>
            <li class="js-menu-show-channels"><a>Show Allocated Channels</a></li>
            <li class="js-menu-show-channels-admin"><a>Show Allocated Channels</a></li>
            <li class="js-menu-meeting-id"><a>Change Meeting ID</a></li>
            <li class="js-menu-clean"><a>Clean</a></li>
            <li class="js-menu-about"><a>About</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <header class="showcase">
    <div class="container showcase-inner js-container">
    </div>
  </header>
`;
const MENU_CLASS_ITEMS = [
  { c: "js-menu-home",                logout: true,  unconf: true , conf: true , admin: true},
  { c: "js-menu-login",               logout: true,  unconf: false, conf: false, admin: false},
  { c: "js-menu-logout",              logout: false, unconf: true , conf: true , admin: true},
  { c: "js-menu-enter-channel",       logout: false, unconf: true , conf: false, admin: false},
  { c: "js-menu-change-channel",      logout: false, unconf: false, conf: true , admin: false},
  { c: "js-menu-remove-channel",      logout: false, unconf: false, conf: true , admin: false},
  { c: "js-menu-show-channels",       logout: false, unconf: true , conf: true , admin: false},
  { c: "js-menu-show-channels-admin", logout: false, unconf: false, conf: false, admin: true},
  { c: "js-menu-meeting-id",          logout: false, unconf: false, conf: false, admin: true},
  { c: "js-menu-clean",               logout: false, unconf: false, conf: false, admin: true},
  { c: "js-menu-about",               logout: true,  unconf: true , conf: true , admin: true},
];

describe('Main menu handler Test Suite', () => {
  beforeEach(() => {
    document.body.innerHTML = HTML;
  });

  test('Test updateMenuState - Not Logged In', () => {
    setGlobalUserInfo(null);
    setAdminMode(false);
    updateMenuState();
    MENU_CLASS_ITEMS.forEach((item) => {
      const element = document.querySelector('.' + item.c)
      let actual = element.style.display;
      const expected = item.logout ? 'block' : 'none';
      expect(actual).toBe(expected);
    });
  });

  test('Test updateMenuState - Logged In - unconfigured', () => {
    const userInfo = new UserInfo();
    userInfo.setName('JohnDoe');
    setGlobalUserInfo(userInfo);
    setAdminMode(false);
    updateMenuState();

    MENU_CLASS_ITEMS.forEach((item) => {
      const element = document.querySelector('.' + item.c)
      let actual = element.style.display;
      const expected = item.unconf ? 'block' : 'none';
      expect(actual).toBe(expected);
    });
  });

  test('Test updateMenuState - Logged In configured', () => {
    setGlobalUserInfo(defaultUser1());
    setAdminMode(false);
    updateMenuState();

    MENU_CLASS_ITEMS.forEach((item) => {
      const element = document.querySelector('.' + item.c)
      let actual = element.style.display;
      const expected = item.conf ? 'block' : 'none';
      expect(actual).toBe(expected);
    });
  });

  test('Test updateMenuState - admin', () => {
    setGlobalUserInfo(null);
    setAdminMode(true);
    updateMenuState();

    MENU_CLASS_ITEMS.forEach((item) => {
      const element = document.querySelector('.' + item.c)
      let actual = element.style.display;
      const expected = item.admin ? 'block' : 'none';
      expect(actual).toBe(expected);
    });
  });

  test('Test handerAbout', () => {
    setGlobalUserInfo(null);
    setAdminMode(false);
    intializeEventListeners();
    updateMenuState();
    const menuAbout = document.querySelector('.js-menu-about');
    menuAbout.click();
    expect(document.body.innerHTML).toContain('Written by Rob Gorsegner');
  });

  test('Test handerHome', () => {
    setGlobalUserInfo(null);
    setAdminMode(false);
    intializeEventListeners();
    updateMenuState();
    const menuHome = document.querySelector('.js-menu-home');
    menuHome.click();
    expect(document.body.innerHTML).toContain('Welcome');
  });

  test('Test showHomeInformation', () => {
    setGlobalUserInfo(null);
    setAdminMode(false);
    showHomeInformation();
    expect(document.body.innerHTML).toContain('Welcome');
  });

  test('Test handerLogin', () => {
    setGlobalUserInfo(null);
    setAdminMode(false);
    intializeEventListeners();
    updateMenuState();
    const menuLogin = document.querySelector('.js-menu-login');
    menuLogin.click();
    expect(document.body.innerHTML).toContain('Login Screen');
  });

  test('Test handerLogout admin mode', () => {
    setGlobalUserInfo(null);
    setAdminMode(true);
    intializeEventListeners();
    updateMenuState();
    const menuLogout = document.querySelector('.js-menu-logout');
    menuLogout.click();
    expect(document.body.innerHTML).toContain('Administrator logged out');
  });

  test('Test handlerEnterChannel', () => {
    const userInfo = new UserInfo();
    userInfo.setName('JohnDoe');
    setGlobalUserInfo(userInfo);
    intializeEventListeners();
    updateMenuState();
    const menuEnterChannel = document.querySelector('.js-menu-enter-channel');
    menuEnterChannel.click();
    expect(document.body.innerHTML).toContain('What type of goggles/video transmitter do you have?');
  });

  test('Test handlerRemoveChannel', () => {
    setGlobalUserInfo(defaultUser1());
    intializeEventListeners();
    updateMenuState();
    const menuRemoveChannel = document.querySelector('.js-menu-remove-channel');
    menuRemoveChannel.click();
    expect(document.body.innerHTML).toContain('Are you sure your want to remove channel?');
  });

  test('Test handerShowChannels', async () => {
    initializeDatabase(new DatabaseMock());
    getDatabase().writeUserData(()=>{}, defaultUser1());
    setGlobalUserInfo(defaultUser1());

    intializeEventListeners();
    updateMenuState(); 
    const menuShowChannels = document.querySelector('.js-menu-show-channels');
    menuShowChannels.click();
    await expect.poll(()=> {
      return document.body.innerHTML
    }, {timeout:5000}).toContain('Channel Allocation Table');
  });

  test('Test cleanAllHandler', ()=>{
    intializeEventListeners();
    updateMenuState(); 
    const menuClean = document.querySelector('.js-menu-clean');
    menuClean.click();
    expect(document.body.innerHTML).toContain('Clean All Users');
  });

  test('Test handlerChangeMeetingId', ()=>{
    intializeEventListeners();
    updateMenuState(); 
    const menuMeetingId = document.querySelector('.js-menu-meeting-id');
    menuMeetingId.click();
    expect(document.body.innerHTML).toContain('Change Meeting ID');
  });

  test('handlerShowChannelsAdmin', async ()=>{
    intializeEventListeners();
    updateMenuState(); 
    initializeDatabase(new DatabaseMock());
    getDatabase().writeUserData(()=>{}, defaultUser1());
    const menuShowChannelsAdmin = document.querySelector('.js-menu-show-channels-admin');
    menuShowChannelsAdmin.click();
    await expect.poll(()=> {
      return document.body.innerHTML
    }, {timeout:5000}).toContain('Channel Allocation Table');
  });
});

