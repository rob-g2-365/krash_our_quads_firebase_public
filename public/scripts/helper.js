export function isAscii(str) {
  return /^[\x20-\x7E]*$/.test(str);
}

export function validateUserName(name) {
  return isAscii(name) && name.trim().length>=2;
} 



