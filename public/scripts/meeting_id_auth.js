const MEETING_ID_ADMIN_HASH=6157855772623008;
const NAME_ADMIN = 'admin';

let adminMode = false;
let meetingIdHash = null;

export function setMeetingId(id) {
  meetingIdHash = cyrb53(id);
}

export function setMeetingIdHash(record) {
  meetingIdHash = record.hash;
}

export function verifyMeetingId(id) {
  return meetingIdHash === cyrb53(id);
}

export function verifyAdmin(name, id){
  return MEETING_ID_ADMIN_HASH === cyrb53(id) && NAME_ADMIN === name;
}

export function cyrb53(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for(let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

export function isAdminMode() {
  return adminMode;
}

export function setAdminMode(mode){
  adminMode = mode;
}