import * as constants from './constants.js';
let arrayUserInfo = null;

export class UserInfo {
  #name = null;
  #aChannel = null;
  #channel = null;
  #goggleType = null;
  #channelLabel = null;

  setName(name) {
    this.#name = name;
    return this;
  }

  setAchannel(aChannel) {
    this.#aChannel = aChannel;
    return this;
  }

  setChannel(channel) {
    this.#channel = channel;
    return this;
  }

  setGoggleType(goggleType) {
    this.#goggleType = goggleType;
    return this;
  }

  setChannelLabel(channelLabel) {
    this.#channelLabel = channelLabel;
    return this;
  }

  setUsingFreqRecord(freqRecord) {
    this.#channelLabel = freqRecord.label;
    this.#channel = freqRecord.channel;
    this.#aChannel = freqRecord.achannel;
    return this;
  }

  getName() {
    return this.#name;
  }

  getAChannel() {
    return this.#aChannel;
  }

  getGoggleType() {
    return this.#goggleType;
  }

  getChannel() {
    return this.#channel;
  }

  getChannelLabel() {
    return this.#channelLabel;
  }

  getFriendlyChannelName() {
    return this.#goggleType + '-CH' + this.#channel;
  }

  isInitialized() {
    return ((this.#goggleType !== null) && (this.#channelLabel !== null));
  }

  getHtmlStatus() {
    const init = this.isInitialized();
    const channelFriendlyName = init ? this.getFriendlyChannelName() : "Not Configured";
    const aChannel = init ? this.getAChannel() : "Not Configured";
    return `
    <table class="channel-table">
      <tr>
        <td>Name</td>
        <td>${this.getName()}</td>
      </tr>
      <tr>
        <td>Channel Info</td>
        <td>${channelFriendlyName}</td>
      </tr>
      <tr>
        <td>Race CH Equivalent</td>
        <td>${aChannel}</td>
      </tr>
    </table>
    `;
  }

  getDataBaseRecord() {
    return {
      name: this.#name,
      aChannel: this.#aChannel,
      channel: this.#channel,
      goggleType: this.#goggleType,
      channelLabel: this.#channelLabel,
    };
  }

  setDataBaseRecord(databaseRecord) {
    // In this instance the name should be set beforehand and we should not update the
    // name.
    this.#aChannel = databaseRecord.aChannel;
    this.#channel = databaseRecord.channel;
    this.#goggleType = databaseRecord.goggleType;
    this.#channelLabel = databaseRecord.channelLabel;
  }

  clearChannelInformation() {
    this.#aChannel = null;
    this.#channel = null;
    this.#goggleType = null;
    this.#channelLabel = null;
  }
}

let gUserInfo = null;

export function loggedIn() {
  return (gUserInfo !== null);
}

export function globalUserLoggedInAndConfigured() {
  return loggedIn() && gUserInfo.isInitialized();
}

export function globalUserLoggedInAndNotConfigured() {
  return loggedIn() && !gUserInfo.isInitialized();
}

export function setGlobalUserInfo(userInfo) {
  gUserInfo = userInfo;
}

export function getGlobalUserInfo() {
  return gUserInfo;
}

export function getGlobalHtmlStatus() {
  if (!gUserInfo) {
    return '<p>User not logged in.</p>'
  }
  return gUserInfo.getHtmlStatus();
}

export function createUserTestData() {
  const FIRST_NAMES = ['Ben', 'Ethen', 'Joel', 'Zane', 'Grant', 'Jayden', 'Arthur', 'Max', 'Mary'];
  let testData = [];
  for (let i = 0; i < FIRST_NAMES.length; i++) {
    const user = createRandomUserInfo(FIRST_NAMES[i]);
    testData.push(user);
  }
  return testData;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function createRandomUserInfo(name) {
  const goggleLength = constants.GOGGLE_RECORDS.length;
  const goggleRecord = constants.GOGGLE_RECORDS[getRandomInt(goggleLength)];
  const numFreqRecords = goggleRecord.freqMap.length;
  const freqRecord = goggleRecord.freqMap[getRandomInt(numFreqRecords)];
  const info = new UserInfo();
  info.setName(name);
  info.setGoggleType(goggleRecord.type);
  info.setUsingFreqRecord(freqRecord);
  return info;
}

export function convertRecordsToArrayOfUsers(users) {
  return users.map(record => {
    const userInfo = new UserInfo();
    userInfo.setName(record.name);
    userInfo.setDataBaseRecord(record);
    return userInfo;
  });
}

export function setArrayOfUsers(users) {
  arrayUserInfo = convertRecordsToArrayOfUsers(users);
}

export function getArrayOfUsers() {
  return arrayUserInfo;
}

export function updateCurrentUserFromArrayOfUsers() {
  if(!gUserInfo) {
    return;
  }

  const foundUser = arrayUserInfo.find((userInfo) =>{
    return userInfo.getName() === gUserInfo.getName();
  });

  // Copy the contents of the record.
  if(foundUser) {
    gUserInfo.setDataBaseRecord(foundUser.getDataBaseRecord());
  } else {
    gUserInfo.clearChannelInformation();
  }
}