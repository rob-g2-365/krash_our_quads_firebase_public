import { setGlobalUserInfo, UserInfo, loggedIn, globalUserLoggedInAndConfigured, globalUserLoggedInAndNotConfigured } from '../../public/scripts/user_info.js';
import * as constants from '../../public/scripts/constants.js';
import { expect, test, describe } from 'vitest';

export const TEST_U1_NAME = 'Joe';
export const TEST_U1_ACHANNEL = 4;
export const TEST_U1_CHANNEL = 3;
export const TEST_U1_GOGGLE_TYPE = constants.DJI_O3;
export const TEST_U1_LABEL = 'dji-O3-ch3';

export const TEST_U2_NAME = 'Dewey';
export const TEST_U2_ACHANNEL = 3;
export const TEST_U2_CHANNEL = 3;
export const TEST_U2_GOGGLE_TYPE = constants.ANALOG;
export const TEST_U2_LABEL = 'analog';

describe('User Information test suite', () => {
  test('Creation of UserInfo class', () => {
    const info = defaultUser1();
    verifyDefaultUser1(info);
  });

  test('Uninitialized test', () => {
    const info = new UserInfo();
    info.setName(TEST_U1_NAME);
    expect(info.isInitialized()).toBeFalsy();
  });

  test('Html status', () => {
    const info = defaultUser1();
    const html = info.getHtmlStatus();
    expect(html).toContain(TEST_U1_NAME);
    expect(html).toContain(info.getFriendlyChannelName());
  });

  test('Set using Frequency record', () => {
    const info = new UserInfo();
    info.setName(TEST_U1_NAME);
    info.setGoggleType(TEST_U1_GOGGLE_TYPE);
    info.setUsingFreqRecord(constants.DJI_O3_RECORD.freqMap[0]);
    verifyDefaultUser1(info);
  });

  test('Test getDataBaseRecord', () => {
    const info = defaultUser1();
    const record = info.getDataBaseRecord();
    expect(record.name).toBe(TEST_U1_NAME);
    expect(record.aChannel).toBe(TEST_U1_ACHANNEL);
    expect(record.channel).toBe(TEST_U1_CHANNEL);
    expect(record.goggleType).toBe(TEST_U1_GOGGLE_TYPE);
    expect(record.channelLabel).toBe(TEST_U1_LABEL);
  });

  test('Test Clear Channel Information', () => {
    const info = defaultUser1();
    info.clearChannelInformation();
    expect(info.isInitialized()).toBeFalsy();
    expect(info.getName()).toBe(TEST_U1_NAME);
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

export function defaultUser1() {
  const info = new UserInfo();
  info.setName(TEST_U1_NAME).setAchannel(TEST_U1_ACHANNEL).setGoggleType(TEST_U1_GOGGLE_TYPE).setChannelLabel(TEST_U1_LABEL)
    .setChannel(TEST_U1_CHANNEL);
  return info;
}

export function defaultUser2() {
  const info = new UserInfo();
  info.setName(TEST_U2_NAME).setAchannel(TEST_U2_ACHANNEL).setGoggleType(TEST_U2_GOGGLE_TYPE).setChannelLabel(TEST_U2_LABEL)
    .setChannel(TEST_U2_CHANNEL);
  return info;
}

function verifyDefaultUser1(info) {
  expect(info.getName()).toBe(TEST_U1_NAME);
  expect(info.getAChannel()).toBe(TEST_U1_ACHANNEL);
  expect(info.getChannel()).toBe(TEST_U1_CHANNEL);
  expect(info.getGoggleType()).toBe(TEST_U1_GOGGLE_TYPE);
  expect(info.getChannelLabel()).toBe(TEST_U1_LABEL);
  expect(info.isInitialized()).toBeTruthy();
  expect(info.getFriendlyChannelName()).toBe(constants.DJI_O3 + '-CH3');
}
