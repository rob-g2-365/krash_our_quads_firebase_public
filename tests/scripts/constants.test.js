import * as constants from '../../public/scripts/constants.js';
import { expect, test, describe } from 'vitest';

const GOGGLE_TYPES = constants.GOGGLE_TYPES;
const GOGGLE_RECORDS = constants.GOGGLE_RECORDS;


describe('Constants test suite',() => {
  test('Test that there are no duplicate race band channels', () => {
    GOGGLE_RECORDS.forEach((goggle) => testEachGoggleForDuplicateRaceChannelEntries(goggle));
  });

  test('Test that there are no duplicate channels', () => {
    GOGGLE_RECORDS.forEach((goggle) => testEachGoggleForDuplicateChannelEntries(goggle));
  });

  test('Test that the freq allocation matches the analog channels.', () => {
    const goggleRecords = GOGGLE_RECORDS.filter((goggle)=>{return goggle.type!=constants.ANALOG; } );
    goggleRecords.forEach((goggleRecord) => { testGoggleFreq(goggleRecord) });
  });

  test('Test goggleToGoggleRecord.', () =>{
    const analogRecord = constants.goggleToGoggleRecord(constants.ANALOG);
    expect(analogRecord.type).toBe(constants.ANALOG);
  });

  test('Test getFreqSelection.', () =>{
    const label = 'walk-ch4';
    const freqInfo = constants.getFreqSelection(constants.WALKSNAIL_RECORD ,label);
    expect(freqInfo.channel).toBe(4);
  });

  test('Test that each google type has a corresponding record.', () =>{
    expect(GOGGLE_TYPES.length).toEqual(GOGGLE_RECORDS.length);
    GOGGLE_RECORDS.forEach((record) =>{
      const found = GOGGLE_TYPES.includes(record.type);
      expect(found).toBeTruthy();
    });
  });
});

function testEachGoggleForDuplicateRaceChannelEntries(goggle) {
  const arrayAchannel = goggle.freqMap.map((channelInfo) => { return channelInfo.achannel; });
  const duplicates = findDuplicates(arrayAchannel);
  expect(duplicates.length, `{goggle.name} contains a duplicate race channel entries.`).toBe(0);
}

function testEachGoggleForDuplicateChannelEntries(goggle) {
  const arrayChannel = goggle.freqMap.map((channelInfo) => { return channelInfo.channel; });
  const duplicates = findDuplicates(arrayChannel);
  expect(duplicates.length, `{goggle.name} contains a duplicate channel entries.`).toBe(0);
}

function testGoggleFreq(goggleRecord) {
  goggleRecord.freqMap.forEach((channelInfo) => {
    const centerFreq = channelInfo.freq;
    const achannelCenterFreq = getAnalogEquivalentRecord(channelInfo.achannel).freq;
    const withInRange = isWithinRange(centerFreq, achannelCenterFreq, 10);
    expect(withInRange, `Failed goggle type ${goggleRecord.type}, label ${channelInfo.label}`).toBeTruthy();
  });
}

function findDuplicates(array) {
  const uniqueElements = new Set();
  const duplicates = [];
  array.forEach(item => {
    if (uniqueElements.has(item)) {
      duplicates.push(item);
    } else {
      uniqueElements.add(item);
    }
  });
  return duplicates;
}

function isWithinRange(actual, expected, rangeWidth) {
  const min = expected - rangeWidth/2;
  const max = expected + rangeWidth/2;
  return (actual >= min) && (actual <= max);
}

function getAnalogEquivalentRecord(achannel) {
  const analogFreqMap = constants.ANALOG_RECORD.freqMap;
  return analogFreqMap.find((channelInfo) => {
    return channelInfo.achannel === achannel;
  });
}