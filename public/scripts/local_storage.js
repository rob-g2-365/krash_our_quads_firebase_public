const LOCALSTORE_NAME = "krash_our_quads_name";
const LOCALSTORE_MEETINGID = "krash_our_quads_meeting_id";
const LOCALSTORE_GOGGLE_TYPE = "krash_our_quads_google_type";
const LOCALSTORE_CHANNEL_LABEL = "krash_our_quads_channel_label";

export function getLocalStoreName() {
  return localStorage.getItem(LOCALSTORE_NAME);
}

export function getLocalStoreMeetingId() {
  return localStorage.getItem(LOCALSTORE_MEETINGID);
}

export function getLocalStoreGoggleType() {
  return localStorage.getItem(LOCALSTORE_GOGGLE_TYPE);
}

export function getLocalStoreChannelLabel() {
  return localStorage.getItem(LOCALSTORE_CHANNEL_LABEL);
}

export function setLocalStoreName(name) {
  localStorage.setItem(LOCALSTORE_NAME, name);
}

export function setLocalStoreMeetingId(meetingId) {
  localStorage.setItem(LOCALSTORE_MEETINGID, meetingId);
}

export function setLocalStoreGoggleType(gogglesType) {
  localStorage.setItem(LOCALSTORE_GOGGLE_TYPE, gogglesType);
}

export function setLocalStoreChannelLabel(channelLabel) {
  localStorage.setItem(LOCALSTORE_CHANNEL_LABEL, channelLabel);
}
