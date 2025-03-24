import { Page } from '../page.js';
import { readFireStoreAllChannels, readFireStoreUserData, deleteFireStoreUserData } from '../../firebase_database.js';
import {UserInfo, convertRecordsToArrayOfUsers} from '../../user_info.js';
import { enableMenu, disableMenu } from '../../helper.js';
import {AddUserAdminSubPage} from './add_user_admin_subpage.js';
import {ChangeUserAdminSubPage} from './change_user_admin_subpage.js';

export class ShowChannelTableAdminPage extends Page {
  arrayUserInfo = null;
  userInfo = null;
  show(callback) {
    this.arrayUserInfo = null;
    this.releasedUserInfo = null;
    readFireStoreAllChannels(this.showTable.bind(this));
  }

  showTable(databaseRecords) {
    enableMenu();
    const arrayUserInfo = convertRecordsToArrayOfUsers(databaseRecords);
    // Add the index to an array element
    this.arrayUserInfo = arrayUserInfo.map((userInfo, index)=> {
      return {userInfo, index};
    });

    const mainspaceElement = document.querySelector(".js-container");
    mainspaceElement.innerHTML = `
      <h2>Channel Allocation Table</h2>
      <table class="channel-table">
        <tr>
          <th><b>Race CH</b></th>
          <th><b>User</b></th>
          <th><b>Platform</b></th>
          <th class="channel-table-release-th"></th>
        </tr>
        ${createRows(this.arrayUserInfo)}
    `;

    this.registerBtnEventListeners();
  }

  registerBtnEventListeners(){
    const buttonsRelease = document.querySelectorAll('.js-button-release');
    buttonsRelease.forEach(button => {
      button.addEventListener('click', this.releaseButtonEventListener.bind(this));
    });

    const buttonsAdd = document.querySelectorAll('.js-button-add');
    buttonsAdd.forEach(button => {
      button.addEventListener('click', this.addButtonEventListener.bind(this));
    });

    const buttonsChange = document.querySelectorAll('.js-button-change');
    buttonsChange.forEach(button => {
      button.addEventListener('click', this.changeButtonEventListener.bind(this));
    });
  }

  releaseButtonEventListener(event){
    const target = event.target;
    const index = target.dataset.releaseId;
    this.userInfo = this.arrayUserInfo[index].userInfo;
    const name = this.userInfo.getName();

    // Verify that the user information is correct.
    // There is no notification.  The user could have modified the channel after the screen has 
    // been shown
    readFireStoreUserData(this.verifyUserData.bind(this), name);
  }

  changeButtonEventListener(event) {
    const target = event.target;
    const index = target.dataset.changeId;
    this.userInfo = this.arrayUserInfo[index].userInfo;
    disableMenu();
    const changeUserSubPage = new ChangeUserAdminSubPage();
    changeUserSubPage.show(this.show.bind(this), this.userInfo);
  }
 
  verifyUserData(json){
    if(!json) {
      // User deleted entry.
      // Show error screen and Refresh page.
      this.userAlreadyRemoved();
      return;
    }

    const  info = new UserInfo();
    info.setName(this.userInfo).setDataBaseRecord(json);

    if(this.userInfo.getChannelLabel() !== info.getChannelLabel()) {
      // User Updated channel.
      // Show error screen and refresh the page.
      this.userAlreadyRemoved();
      return;
    }

    this.showRemoveVerifiedScreen();
  }

  userAlreadyRemoved() {
    const name = this.userInfo.getName();
    const page = new Page();
    const html = `
    <h2>Stale Data Warning</h2>
    <p>User ${name} channel has been already removed from the database.<p>
    <p>Refreshing table</p> 
    `;
    disableMenu();
    page.showOk(html, this.show.bind(this));
  }
  userChannelHasChanged() {
    const page = new Page();
    const name = this.userInfo.getName();
    const html = `
    <h2>Stale Data Warning</h2>
    <p>User ${name} channel allocation has changed.<p>
    <p>Refreshing table</p> 
    `;
    disableMenu();
    page.showOk(html, this.show.bind(this));
  }

  showRemoveVerifiedScreen() {
    const page = new Page();
    const html = `
      <h2>Are you sure you want to remove this user?</h2>
      ${this.userInfo.getHtmlStatus()}
    `;

    disableMenu();
    page.showOkCancel(html, this.releaseUser.bind(this), 
      this.show.bind(this));
  }

  releaseUser() {
    enableMenu();
    deleteFireStoreUserData(this.show.bind(this), this.userInfo);
  }

  addButtonEventListener(event) {
    const target = event.target;
    const aChannel = target.dataset.addId;
    disableMenu();
    const addUserSubPage = new AddUserAdminSubPage();
    addUserSubPage.show(this.show.bind(this), aChannel);
  }

}

function createRows(arrayUsersInfo) {
  let html = '';

  for (let aChannel = 1; aChannel <= 8; aChannel++) {
    // Channel 6 is used for DJI and walksnail common channel.
    if (aChannel == 6) {
      continue;
    }

    // Only get the users that are on the same analog channel and checked in.
    const arrayUserInfoForChannel = arrayUsersInfo.filter((item) => {
      return item.userInfo.getAChannel() == aChannel;
    });

    // Sort the names.
    arrayUserInfoForChannel.sort((u1, u2) => { return u1.userInfo.getName() > u2.userInfo.getName() });
    html += createUserRow(arrayUserInfoForChannel, aChannel);
  }
  return html;
}

function createUserRow(arrayUserInfo, aChannel) {
  let html = '';
  const length = arrayUserInfo.length;
  if (length === 0) {
    return `
    <tr>
      <td>
        <button data-add-id="${aChannel}" class="admin-channel-button js-button-add">+${aChannel}</button>
      </td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    `;
  }

  for (let i = 0; i < length; i++) {
    if (i == 0) {
      html += createFirstAchannelRow(arrayUserInfo[i], length);
    } else {
      html += createAchannelRow(arrayUserInfo[i]);
    }
  }
  return html;
}

function createFirstAchannelRow(firstUser, length) {
  const name = firstUser.userInfo.getName();
  const index = firstUser.index;
  const friendlyChannelName = firstUser.userInfo.getFriendlyChannelName();
  const aChannel = firstUser.userInfo.getAChannel();
  const html = `
    <tr>
      <td rowspan="${length}">
        <button data-add-id="${aChannel}" class="admin-channel-button js-button-add">+${aChannel}</button>
      </td>
      <td>${name}</td>
      <td>${friendlyChannelName}</td>
      <td class="horizontal-buttons">
        <button data-change-id="${index}" class="admin-channel-button js-button-change">C</button>
        <button data-release-id="${index}" class="admin-channel-button js-button-release">-</button>
      </td>
    </tr>`;
  return html;
}

function createAchannelRow(user) {
  const name = user.userInfo.getName();
  const index = user.index;
  const friendlyChannelName = user.userInfo.getFriendlyChannelName();
  return `
    <tr>
      <td>${name}</td>
      <td>${friendlyChannelName}</td>
      <td>
        <button data-change-id="${index}" class="admin-channel-button js-button-change">C</button>
        <button data-release-id="${index}" class="admin-channel-button js-button-release">-</button>
      </td>
    </tr>`;
}


