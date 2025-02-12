import { Page } from './page.js';
import { readFireStoreAllChannels } from '../firebase_database.js';
import { ConvertRecordsToArrayOfUsers } from '../user_info.js'

export class ShowChannelTablePage extends Page {
  show(callback) {
    this.showTable = this.showTable.bind(this);
    readFireStoreAllChannels(this.showTable);
  }

  showTable(databaseRecords) {
    const arrayUserInfo = ConvertRecordsToArrayOfUsers(databaseRecords);
    const mainspaceElement = document.querySelector(".js-container");
    mainspaceElement.innerHTML = `
      <h2>Channel Allocation Table</h2>
      <table>
        <tr>
          <th><b>Analog Channel</b></th>
          <th><b>User</b></th>
          <th><b>Platform</b></th>
        </tr>
        ${createRows(arrayUserInfo)}
      </table>
    `;
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
  const html = `
    <tr>
      <td rowspan="${length}">${firstUserInfo.getAChannel()}</td>
      <td>${firstUserInfo.getName()}</td>
      <td>${firstUserInfo.getFriendlyChannelName()}</td>
    </tr>`;
  return html;
}

function createAchannelRow(userInfo) {
  return `
    <tr>
      <td>${userInfo.getName()}</td>
      <td>${userInfo.getFriendlyChannelName()}</td>
    </tr>`;
}
