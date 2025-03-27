import { Page } from './page.js';
import { convertRecordsToArrayOfUsers, getGlobalUserInfo , setArrayOfUsers, updateCurrentUserFromArrayOfUsers} from '../user_info.js'
import { getDatabase } from '../database.js';

export class ShowChannelTablePage extends Page {
  #callback = null;
  show(callback) {
    this.#callback = callback;
    getDatabase().readAllChannels(this.showTable.bind(this));
  }

  showTable(databaseRecords) {
    setArrayOfUsers(databaseRecords);    
    updateCurrentUserFromArrayOfUsers();
    const arrayUserInfo = convertRecordsToArrayOfUsers(databaseRecords);
    const mainspaceElement = document.querySelector(".js-container");
    mainspaceElement.innerHTML = `
      <h2>Channel Allocation Table</h2>
      <table class="channel-table">
        <tr>
          <th><b>Race CH</b></th>
          <th><b>User</b></th>
          <th><b>Platform</b></th>
        </tr>
        ${createRows(arrayUserInfo)}
    `;
    this.#callback();
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
    const arrayUserInfoForChannel = arrayUsersInfo.filter((userInfo) => {
      return (userInfo.getAChannel() == aChannel);
    });

    // Sort the names.
    arrayUserInfoForChannel.sort((u1, u2) => { return u1.getName() > u2.getName() });
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
      <td>${aChannel}</td>
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

function createFirstAchannelRow(firstUserInfo, length) {
  const name = firstUserInfo.getName();
  const friendlyChannelName = firstUserInfo.getFriendlyChannelName();
  const currentUser = isCurrentUser(firstUserInfo);

  const html = `
    <tr>
      <td rowspan="${length}">${firstUserInfo.getAChannel()}</td>
      <td>${boldText(name, currentUser)}</td>
      <td>${boldText(friendlyChannelName, currentUser)}</td>
    </tr>`;
  return html;
}


function createAchannelRow(userInfo) {
  const name = userInfo.getName();
  const friendlyChannelName = userInfo.getFriendlyChannelName();
  const currentUser = isCurrentUser(userInfo);
  return `
    <tr>
      <td>${boldText(name, currentUser)}</td>
      <td>${boldText(friendlyChannelName, currentUser)}</td>
    </tr>`;
}

function isCurrentUser(userInfo) {
  return (userInfo.getName() === getGlobalUserInfo().getName());
}

function boldText(text, bold) {
  return (bold ? `<b>${text}</b>` : text);
}
