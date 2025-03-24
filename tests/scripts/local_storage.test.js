import {getLocalStoreChannelLabel, getLocalStoreGoggleType, getLocalStoreMeetingId, getLocalStoreName, setLocalStoreChannelLabel, setLocalStoreGoggleType, setLocalStoreMeetingId, setLocalStoreName} from '../../public/scripts/local_storage.js';
import * as constant from '../../public/scripts/constants.js';
import { expect, test, describe } from 'vitest';

const TEST_NAME = 'TestName';
const TEST_MEETING_ID='555AAA';
const TEST_GOGGLE_TYPE = constant.DJI_O3;
const TEST_CHANNEL_LABEL = 'a-ch5';

describe('Localstorage test suite', () => {
  test('Get/Set Name', ()=>{
    setLocalStoreName(TEST_NAME);
    expect(getLocalStoreName()).toBe(TEST_NAME);
  });
  test('Get/Set MeetingId', ()=>{
    setLocalStoreMeetingId(TEST_MEETING_ID);
    expect(getLocalStoreMeetingId()).toBe(TEST_MEETING_ID);
  });

  test('Get/Set GoggleType', ()=>{
    setLocalStoreGoggleType(TEST_GOGGLE_TYPE);
    expect(getLocalStoreGoggleType()).toBe(TEST_GOGGLE_TYPE);
  });

  test('Get/Set Channel Label', ()=>{
    setLocalStoreChannelLabel(TEST_CHANNEL_LABEL);
    expect(getLocalStoreChannelLabel()).toBe(TEST_CHANNEL_LABEL);

  })
});

