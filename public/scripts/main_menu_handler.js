import {loggedIn, globalUserLoggedInAndConfigured, globalUserLoggedInAndNotConfigured} from './user_info.js';
import { isAdminMode } from './meeting_id_auth.js';
import { HomePage } from './pages/home_page.js';
import { MeetingIdLoginPage } from './pages/meeting_id_login_page.js';
import { MeetingIdLogoutPage } from './pages/meeting_id_logout_page.js';
import { EnterChannelPage } from './pages/enter_channel_page.js';
import { RemoveChannelPage } from './pages/remove_channel_page.js';
import { ShowChannelTablePage } from './pages/show_channel_table_page.js';
import { ChangeMeetingIdPage } from './pages/change_meeting_id_page.js';
import { CleanAllPage } from './pages/clean_all_page.js';
import {AboutPage} from './pages/about_page.js';

const menuHome = 'js-menu-home';
const menuLogin = 'js-menu-login';
const menuLogout ='js-menu-logout';
const menuEnterChannel = 'js-menu-enter-channel';
const menuChangeChannel = 'js-menu-change-channel';
const menuRemoveChannel = 'js-menu-remove-channel';
const menuShowChannels = 'js-menu-show-channels';
const menuChangeMeetingId = 'js-menu-meeting-id';
const menuClean = 'js-menu-clean';
const menuAbout = 'js-menu-about';

const menuHandlers = [
  {f: handlerHome,          c:menuHome,         userEntry:false},
  {f: handlerLogin,         c:menuLogin,        userEntry:true},
  {f: handlerLogout,        c:menuLogout,       userEntry:true},
  {f: handlerEnterChannel,  c:menuEnterChannel, userEntry:true},
  {f: handlerEnterChannel,  c:menuChangeChannel,userEntry:true},
  {f: handlerRemoveChannel, c:menuRemoveChannel,userEntry:true},
  {f: handlerShowChannels,  c:menuShowChannels, userEntry:false},  
  {f: handlerChangeMeetingId,c:menuChangeMeetingId, userEntry: true },
  {f: handlerClean,         c:menuClean,        userEntry:true},
  {f: handlerAbout,         c:menuAbout,        userEntry:false}
];

const homePage = new HomePage();
const loginPage = new MeetingIdLoginPage();
const logoutPage = new MeetingIdLogoutPage();
const enterChannelPage = new EnterChannelPage();
const removeChannelPage = new RemoveChannelPage();
const channelTablePage = new ShowChannelTablePage();
const changeMeetingIdPage = new ChangeMeetingIdPage();
const cleanAllPage = new CleanAllPage();
const aboutPage = new AboutPage();

let lastShowablePage = homePage;
function empty(){
}

export function showHomeInformation() {
  homePage.show(empty);
  lastShowablePage = homePage;
}

function handlerHome(event) {
  clearMenu();
  homePage.show(empty);
  lastShowablePage = homePage;
}

function handlerLogin(event) {
  clearMenu();
  disableMenu();
  loginPage.show(logInCallback);

}

function logInCallback() {
  enableMenu();
  updateMenuState();
  if(isAdminMode()) {
    menuHome.show();
  } else {
    channelTablePage.show();
    lastShowablePage = channelTablePage;
  }
}

function handlerLogout(event) {
  clearMenu();
  disableMenu();
  logoutPage.show(logoutCallback);
}

function logoutCallback(){
  enableMenu();
  updateMenuState();
  homePage.show(empty);
  lastShowablePage = homePage;
}

function handlerEnterChannel(event) {
  clearMenu();
  disableMenu();
  enterChannelPage.show(enterChannelCallback);
}

function enterChannelCallback(){
  enableMenu();
  updateMenuState();
  lastShowablePage.show();
}

function handlerRemoveChannel(event) {
  clearMenu();
  disableMenu();
  removeChannelPage.show(removeChannelCallback);
}

function removeChannelCallback() {
  enableMenu();
  updateMenuState();
  lastShowablePage.show();
}

function handlerShowChannels() {
  clearMenu();
  channelTablePage.show(empty);
  lastShowablePage = channelTablePage;
}

function handlerClean() {
  clearMenu();
  disableMenu();
  cleanAllPage.show(cleanCallback);
}

function cleanCallback() {
  enableMenu();
  lastShowablePage.show();
}

function handlerChangeMeetingId() {
  clearMenu();
  disableMenu();
  changeMeetingIdPage.show(changeMeetingIdCallback);
}

function changeMeetingIdCallback() {
  enableMenu();
  lastShowablePage.show();
}

function handlerAbout() {
  clearMenu();
  aboutPage.show(empty);
  lastShowablePage = aboutPage;
}

function clearMenu() {
  document.querySelector('.js-toggler').checked = false;
}

export function updateMenuState() {
  setMenuEnable(menuLogin, !loggedIn() && !isAdminMode());
  setMenuEnable(menuLogout, loggedIn() || isAdminMode());
  setMenuEnable(menuEnterChannel, globalUserLoggedInAndNotConfigured());
  setMenuEnable(menuChangeChannel, globalUserLoggedInAndConfigured());
  setMenuEnable(menuRemoveChannel, globalUserLoggedInAndConfigured());
  setMenuEnable(menuShowChannels, loggedIn());
  setMenuEnable(menuChangeMeetingId, isAdminMode());
  setMenuEnable(menuClean, isAdminMode());
}

function setMenuEnable(className, enable) {
  document.querySelector('.' + className).style.display = enable?'block':'none';
}

function enableMenu() {
  document.querySelector('.js-toggler').style.display = 'block';
}

function disableMenu() {
  document.querySelector('.js-toggler').style.display = 'none';
}

export function intializeEventListeners(){
  menuHandlers.forEach((item) => {
    const element = document.querySelector('.' + item.c);
    element.addEventListener('click',item.f);
  });
}
