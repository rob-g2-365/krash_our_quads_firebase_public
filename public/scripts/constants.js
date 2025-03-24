export const VERSION = '0.2.0';

export const ANALOG = 'analog-race';
export const DJI_O3 = 'dji-ham-o3-25mbs';
export const DJI_V1 = 'dji-v1';
export const DJI_RACE = 'dji-race';
export const WALKSNAIL = 'walksnail-fcc-25bms';
export const WALKSNAIL_RACE = 'walksnail-race';
export const HDZERO_RACE = 'hdzero-race';
export const HDZERO_LOW = 'hdzero-low';

export const ANALOG_RECORD = {
  type: ANALOG,
  name: 'Analog Race Band',
  bandwith: 30,
  question: 'Choose the race band analog channel?',
  notes: 'Note that Channel 6 is skipped because it is ' +
    'the common frequency used at startup for the DJI and Walksnail goggles.',
  freqMap: [
    { label: 'a-ch1', channel: 1, achannel: 1, name: 'Channel 1 Band R', freq: 5658 },
    { label: 'a-ch2', channel: 2, achannel: 2, name: 'Channel 2 Band R', freq: 5695 },
    { label: 'a-ch3', channel: 3, achannel: 3, name: 'Channel 3 Band R', freq: 5732 },
    { label: 'a-ch4', channel: 4, achannel: 4, name: 'Channel 4 Band R', freq: 5769 },
    { label: 'a-ch5', channel: 5, achannel: 5, name: 'Channel 5 Band R', freq: 5806 },
    { label: 'a-ch7', channel: 7, achannel: 7, name: 'Channel 7 Band R', freq: 5880 },
    { label: 'a-ch8', channel: 8, achannel: 8, name: 'Channel 8 Band R', freq: 5917 }
  ]
};

export const DJI_V1_RECORD = {
  type: DJI_V1,
  name: 'DJI V1/V2 25Mbs',
  bandwidth: 20,
  question: 'Choose the DJI V1/V2 channel?',
  notes: '<p>Ensure that you are configured for 25Mbs data throughput.</p><br/>' +
    '<p>Channel 3 is removed because of the potential for bleeding into other ' +
    'channels. Channel 8 is the public/configuration channel, so it ' +
    'is not used.<p>',
  freqMap: [
    { label: 'dji-v1-ch1', channel: 1, achannel: 1, name: 'Channel 1 (a-ch1)', freq: 5660 },
    { label: 'dji-v1-ch2', channel: 2, achannel: 2, name: 'Channel 2 (a-ch2)', freq: 5695 },
    { label: 'dji-v1-ch4', channel: 4, achannel: 4, name: 'Channel 4 (a-ch4)', freq: 5770 },
    { label: 'dji-v1-ch5', channel: 5, achannel: 5, name: 'Channel 5 (a-ch5)', freq: 5805 },
    { label: 'dji-v1-ch6', channel: 6, achannel: 7, name: 'Channel 6 (a-ch7)', freq: 5878 },
    { label: 'dji-v1-ch7', channel: 7, achannel: 8, name: 'Channel 7 (a-ch8)', freq: 5914 }
  ]
};

export const DJI_O3_RECORD = {
  type: DJI_O3,
  name: 'DJI O3/O4 HAM 25Mbs',
  bandwidth: 20,
  question: 'Choose the DJI O3/O4 channel?',
  notes: '<p>Ensure the following are set in the goggles:<p>' +
    '<div class="center-div"><ol>' +
    '<li class="left">25Mbs data throughput</li>' +
    '<li class="left">Frequency as manual.</li>' +
    '<li class="left">Goggles have been ham unlocked</li>' +
    '<li class="left">Eight channels are available in the goggles.</li>' +
    '</ol></div>' +
    '<p>Channel 1 and Channel 2 are removed because they bleed into other ' +
    'channels. Channel 5 is the public/configuration channel for DJI and ' +
    'Walksnail so it is removed also.</p>',
  freqMap: [
    { label: 'dji-O3-ch3', channel: 3, achannel: 4, name: 'Channel 3 (a-ch4)', freq: 5768 },
    { label: 'dji-O3-ch4', channel: 4, achannel: 5, name: 'Channel 4 (a-ch5)', freq: 5804 },
    { label: 'dji-O3-ch6', channel: 6, achannel: 7, name: 'Channel 6 (a-ch7)', freq: 5876 },
    { label: 'dji-O3-ch7', channel: 7, achannel: 8, name: 'Channel 7 (a-ch8)', freq: 5912 }
  ]
};


export const DJI_RACE_RECORD = {
  type: DJI_RACE,
  name: 'DJI O4 Race Band',
  bandwith: 30,
  question: 'Choose the DJI O4 Race Band channel?',
  notes: 'Note that Channel 6 is skipped because it is ' +
    'the common frequency used at startup for the DJI and Walksnail goggles.',
  freqMap: [
    { label: 'dji-r-ch1', channel: 1, achannel: 1, name: 'Channel 1 Band R', freq: 5658 },
    { label: 'dji-r-ch2', channel: 2, achannel: 2, name: 'Channel 2 Band R', freq: 5695 },
    { label: 'dji-r-ch3', channel: 3, achannel: 3, name: 'Channel 3 Band R', freq: 5732 },
    { label: 'dji-r-ch4', channel: 4, achannel: 4, name: 'Channel 4 Band R', freq: 5769 },
    { label: 'dji-r-ch5', channel: 5, achannel: 5, name: 'Channel 5 Band R', freq: 5806 },
    { label: 'dji-r-ch7', channel: 7, achannel: 7, name: 'Channel 7 Band R', freq: 5880 },
    { label: 'dji-r-ch8', channel: 8, achannel: 8, name: 'Channel 8 Band R', freq: 5917 }
  ]
};


export const HDZERO_RACE_RECORD = {
  type: HDZERO_RACE,
  name: 'HDZero Race Band',
  bandwith: 27,
  question: 'Choose the HDZero Race Channel?',
  notes: 'Please configure your HDZero goggles to use FCC mode with ' +
    '8 channels. If 8 channels are not supported, you may need to upgrade your ' +
    'goggle\'s firmware. See https://www.hd-zero.com/document ' +
    'HDZero Channel 6 is skipped because it is the common frequency used at ' +
    'startup for the DJI and Walksnail goggles.',
  freqMap: [
    { label: 'hdz-r-ch1', channel: 1, achannel: 1, name: 'Channel R1', freq: 5658 },
    { label: 'hdz-r-ch2', channel: 2, achannel: 2, name: 'Channel R2', freq: 5695 },
    { label: 'hdz-r-ch3', channel: 3, achannel: 3, name: 'Channel R3', freq: 5732 },
    { label: 'hdz-r-ch4', channel: 4, achannel: 4, name: 'Channel R4', freq: 5769 },
    { label: 'hdz-r-ch5', channel: 5, achannel: 5, name: 'Channel R5', freq: 5806 },
    { label: 'hdz-r-ch7', channel: 7, achannel: 7, name: 'Channel R7', freq: 5880 },
    { label: 'hdz-r-ch8', channel: 8, achannel: 8, name: 'Channel R8', freq: 5917 }
  ]
};

export const WALKSNAIL_RECORD = {
  type: WALKSNAIL,
  name: 'Walksnail FCC 25Mbs',
  bandwidth: 20,
  question: 'Choose the Walksnail Channel?',
  notes: 'Please use 25Mbs data throughput. You should have 8 Channels. If ' +
    'you do not, please the download the FCC Unlock Procedure from ' +
    'https://caddxfpv.com/pages/download-center ' +
    'Channel 8 is omitted because it is a common channel used for configuration.',
  freqMap: [
    { label: 'walk-ch1', channel: 1, achannel: 1, name: 'Channel 1 (a-ch1)', freq: 5658 },
    { label: 'walk-ch2', channel: 2, achannel: 2, name: 'Channel 2 (a-ch2)', freq: 5695 },
    { label: 'walk-ch3', channel: 3, achannel: 3, name: 'Channel 3 (a-ch3)', freq: 5732 },
    { label: 'walk-ch4', channel: 4, achannel: 4, name: 'Channel 4 (a-ch4)', freq: 5769 },
    { label: 'walk-ch5', channel: 5, achannel: 5, name: 'Channel 5 (a-ch5)', freq: 5806 },
    { label: 'walk-ch6', channel: 6, achannel: 7, name: 'Channel 6 (a-ch7)', freq: 5880 },
    { label: 'walk-ch7', channel: 7, achannel: 8, name: 'Channel 7 (a-ch8)', freq: 5917 }
  ]
};

export const WALKSNAIL_RACE_RECORD = {
  type: WALKSNAIL_RACE,
  name: 'Walksnail Race Band',
  bandwith: 30,
  question: 'Choose the WalkSnail Race Band channel?',
  notes: 'Note that Channel 6 is skipped because it is ' +
    'the common frequency used at startup for the DJI and Walksnail goggles.',
  freqMap: [
    { label: 'walk-r-ch1', channel: 1, achannel: 1, name: 'Channel 1 Band R', freq: 5658 },
    { label: 'walk-r-ch2', channel: 2, achannel: 2, name: 'Channel 2 Band R', freq: 5695 },
    { label: 'walk-r-ch3', channel: 3, achannel: 3, name: 'Channel 3 Band R', freq: 5732 },
    { label: 'walk-r-ch4', channel: 4, achannel: 4, name: 'Channel 4 Band R', freq: 5769 },
    { label: 'walk-r-ch5', channel: 5, achannel: 5, name: 'Channel 5 Band R', freq: 5806 },
    { label: 'walk-r-ch7', channel: 7, achannel: 7, name: 'Channel 7 Band R', freq: 5880 },
    { label: 'walk-r-ch8', channel: 8, achannel: 8, name: 'Channel 8 Band R', freq: 5917 }
  ]
};

export const GOGGLE_TYPES = [ANALOG, DJI_V1, DJI_O3, DJI_RACE, HDZERO_RACE, WALKSNAIL, WALKSNAIL_RACE];
export const GOGGLE_RECORDS = [ANALOG_RECORD, DJI_V1_RECORD, DJI_O3_RECORD, DJI_RACE_RECORD, HDZERO_RACE_RECORD, WALKSNAIL_RECORD, WALKSNAIL_RACE_RECORD];

export function goggleToGoggleRecord(gogglesType) {
  return GOGGLE_RECORDS.find((g) => g.type === gogglesType);
}

export function getFreqSelection(gogglesInfo, label) {
  const freqMap = gogglesInfo.freqMap;
  return freqMap.find((freqRecord) => { return (freqRecord.label == label); });
}


