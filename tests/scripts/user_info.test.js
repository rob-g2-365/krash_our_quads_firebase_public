import { setGlobalUserInfo, UserInfo, loggedIn, globalUserLoggedInAndConfigured, globalUserLoggedInAndNotConfigured } from '../../public/scripts/user_info.js';
import * as constants from '../../public/scripts/constants.js';
import { expect, test, describe } from 'vitest';

const TEST_NAME = 'Joe';
const TEST_ACHANNEL = 4;
const TEST_CHANNEL = 3;
const TEST_GOGGLE_TYPE = constants.DJI_O3;
const TEST_LABEL = 'dji-O3-ch3';


describe('User Information test suite', () => {
  test('Creation of UserInfo class', () => {
    const info = defaultUser1();
    verifyDefaultUser1(info);
  });

  test('Uninitialized test', () => {
    const info = new UserInfo();
    info.setName(TEST_NAME);
    expect(info.isInitialized()).toBeFalsy();
  });

  test('Html status', () => {
    const info = defaultUser1();
    const html = info.getHtmlStatus();
    expect(html).toContain(TEST_NAME);
    expect(html).toContain(info.getFriendlyChannelName());
  });

  test('Set using Frequency record', () => {
    const info = new UserInfo();
    info.setName(TEST_NAME);
    info.setGoggleType(TEST_GOGGLE_TYPE);
    info.setUsingFreqRecord(constants.DJI_O3_RECORD.freqMap[0]);
    verifyDefaultUser1(info);
  });

  test('Test getDataBaseRecord', () => {
    const info = defaultUser1();
    const record = info.getDataBaseRecord();
    expect(record.name).toBe(TEST_NAME);
    expect(record.aChannel).toBe(TEST_ACHANNEL);
    expect(record.channel).toBe(TEST_CHANNEL);
    expect(record.goggleType).toBe(TEST_GOGGLE_TYPE);
    expect(record.channelLabel).toBe(TEST_LABEL);
  });

  test('Test Clear Channel Information', () => {
    const info = defaultUser1();
    info.clearChannelInformation();
    expect(info.isInitialized()).toBeFalsy();
    expect(info.getName()).toBe(TEST_NAME);
  });

  test('Test loggedIn', () => {
    setGlobalUserInfo(null);
    expect(loggedIn()).toBeFalsy();

    setGlobalUserInfo(defaultUser1());
    expect(loggedIn()).toBeTruthy();
    expect(globalUserLoggedInAndConfigured()).toBeTruthy();
    expect(globalUserLoggedInAndNotConfigured()).toBeFalsy();
  });
});

function defaultUser1() {
  const info = new UserInfo();
  info.setName(TEST_NAME).setAchannel(TEST_ACHANNEL).setGoggleType(TEST_GOGGLE_TYPE).setChannelLabel(TEST_LABEL)
    .setChannel(TEST_CHANNEL);
  return info;
}

function verifyDefaultUser1(info) {
  expect(info.getName()).toBe(TEST_NAME);
  expect(info.getAChannel()).toBe(TEST_ACHANNEL);
  expect(info.getChannel()).toBe(TEST_CHANNEL);
  expect(info.getGoggleType()).toBe(TEST_GOGGLE_TYPE);
  expect(info.getChannelLabel()).toBe(TEST_LABEL);
  expect(info.isInitialized()).toBeTruthy();
  expect(info.getFriendlyChannelName()).toBe(constants.DJI_O3 + '-CH3');
}
