export const VERSION = '0.1.1';

export const ANALOG = 'analog';
export const DJI = 'dji';
export const HDZERO = 'hdzero';
export const WALKSNAIL = 'walksnail';
export const VISTA = 'vista';

export const ANALOG_RECORD = {
  type: ANALOG,
  name: 'Analog',
  question: 'Choose the R band analog channel?',
  notes: 'Note that Channel 6 is skipped because it is ' + 'the common frequency used at startup for the DJI and Walksnail goggles.',
  freqMap: [
    { label: 'a-ch1', channel: 1, achannel: 1, name: 'Channel 1 Band R', freq: 5.658 },
    { label: 'a-ch2', channel: 2, achannel: 2, name: 'Channel 2 Band R', freq: 5.695 },
    { label: 'a-ch3', channel: 3, achannel: 3, name: 'Channel 3 Band R', freq: 5.732 },
    { label: 'a-ch4', channel: 4, achannel: 4, name: 'Channel 4 Band R', freq: 5.769 },
    { label: 'a-ch5', channel: 5, achannel: 5, name: 'Channel 5 Band R', freq: 5.806 },
    { label: 'a-ch7', channel: 7, achannel: 7, name: 'Channel 7 Band R', freq: 5.880 },
    { label: 'a-ch8', channel: 8, achannel: 8, name: 'Channel 8 Band R', freq: 5.917 }
  ]
};

export const VISTA_RECORD = {
  type: VISTA,
  name: 'DJI Vista/V1/V2',
  question: 'Choose the DJI Vista/V1/V2 channel?',
  notes: 'Please use 25Mbs data throughput. ' + 
    'Channel 3 is removed because of the potential for bleeding into other analog channels. '+
    'Channel 8 is the public/configuration channel, so it is not used. ',
  freqMap: [
    { label: 'vista-ch1', channel: 1, achannel: 1, name: 'Channel 1 (a-ch1)', freq: 5660 },
    { label: 'vista-ch2', channel: 2, achannel: 2, name: 'Channel 2 (a-ch2)', freq: 5695 },
    { label: 'vista-ch4', channel: 4, achannel: 4, name: 'Channel 4 (a-ch4)', freq: 5770 },
    { label: 'vista-ch5', channel: 5, achannel: 5, name: 'Channel 5 (a-ch5)', freq: 5805 },
    { label: 'vista-ch6', channel: 6, achannel: 7, name: 'Channel 6 (a-ch7)', freq: 5878 },
    { label: 'vista-ch7', channel: 7, achannel: 8, name: 'Channel 7 (a-ch8)', freq: 5914 }
  ]
}

export const DJI_RECORD = {
  type: DJI,
  name: 'DJI O3/O4',
  question: 'Choose the DJI O3/O4 channel?',
  notes: 'Please use 25Mbs data throughput. ' +
    'Channel 1 and Channel 2 are removed because they bleed into other analog channels.' +
    'Channel 5 is the public/configuration channel for DJI and Walksnail so it is removed also.',
  freqMap: [
    { label: 'dji-ch3', channel: 3, achannel: 4, name: 'Channel 3 (a-ch4)', freq: 5.768 },
    { label: 'dji-ch4', channel: 4, achannel: 5, name: 'Channel 4 (a-ch5)', freq: 5.804 },
    { label: 'dji-ch6', channel: 6, achannel: 7, name: 'Channel 6 (a-ch7)', freq: 5.876 },
    { label: 'dji-ch7', channel: 7, achannel: 8, name: 'Channel 7 (a-ch8)', freq: 5.912 }
  ]
};

export const HDZERO_RECORD = {
  type: HDZERO,
  name: 'HDZero',
  question: 'Choose the HDZero Channel?',
  notes: 'Please configure your HDZero goggles to use FCC mode, Low Band, with 8 channels. If 8 channels are not supported, you may need to upgrade your goggle\'s firmware.' +
    'See https://www.hd-zero.com/document' +
    'HDZero Channel 6 is skipped because it is the common frequency used at startup for the DJI and Walksnail goggles.',
  freqMap: [
    { label: 'hdz-ch1', channel: 1, achannel: 1, name: 'Channel L1', freq: 5.658 },
    { label: 'hdz-ch2', channel: 2, achannel: 2, name: 'Channel L2', freq: 5.695 },
    { label: 'hdz-ch3', channel: 3, achannel: 3, name: 'Channel L3', freq: 5.732 },
    { label: 'hdz-ch4', channel: 4, achannel: 4, name: 'Channel L4', freq: 5.769 },
    { label: 'hdz-ch5', channel: 5, achannel: 5, name: 'Channel L5', freq: 5.806 },
    { label: 'hdz-ch7', channel: 7, achannel: 7, name: 'Channel L7', freq: 5.880 },
    { label: 'hdz-ch8', channel: 8, achannel: 8, name: 'Channel L8', freq: 5.917 }
  ]
};

const WALKSNAIL_RECORD = {
  type: WALKSNAIL,
  question: 'Choose the Walksnail Channel?',
  name: 'WalkSnail',
  notes: 'Please use 25Mbs data throughput.   You should have 8 Channels.  If you do not, please the download the FCC Unlock Procedure from https://caddxfpv.com/pages/download-center' +
    'Channel 8 is omitted because it is a common channel used for configuration.',
  freqMap: [
    { label: 'walk-ch1', channel: 1, achannel: 1, name: 'Channel 1 (a-ch1)', freq: 5.658 },
    { label: 'walk-ch2', channel: 2, achannel: 2, name: 'Channel 2 (a-ch2)', freq: 5.695 },
    { label: 'walk-ch3', channel: 3, achannel: 3, name: 'Channel 3 (a-ch3)', freq: 5.732 },
    { label: 'walk-ch4', channel: 4, achannel: 4, name: 'Channel 4 (a-ch4)', freq: 5.769 },
    { label: 'walk-ch5', channel: 5, achannel: 5, name: 'Channel 5 (a-ch5)', freq: 5.806 },
    { label: 'walk-ch6', channel: 6, achannel: 7, name: 'Channel 6 (a-ch7)', freq: 5.880 },
    { label: 'walk-ch7', channel: 7, achannel: 8, name: 'Channel 7 (a-ch8)', freq: 5.917 }
  ]
};

export const GOGGLE_TYPES = [ANALOG, VISTA, DJI, HDZERO, WALKSNAIL];
export const GOGGLES_RECORDS = [ANALOG_RECORD, VISTA_RECORD, DJI_RECORD, HDZERO_RECORD, WALKSNAIL_RECORD];

export function goggleToGoggleRecord(gogglesType) {
  return GOGGLES_RECORDS.find((g) => g.type === gogglesType)
}

export function getFreqSelection(gogglesInfo, label) {
  const freqMap = gogglesInfo.freqMap;
  return freqMap.find((freqRecord) => { return (freqRecord.label == label); });
}