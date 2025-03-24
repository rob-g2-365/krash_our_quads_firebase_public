export function isAscii(str) {
  return /^[\x20-\x7E]*$/.test(str);
}

export function validateUserName(name) {
  return isAscii(name) && name.trim().length>=2;
} 


export function enableMenu() {
  const elementHamburger = document.querySelector('.hamburger');
  elementHamburger.classList.remove('hamburger-disable');

  const elementToggler = document.querySelector('.toggler');
  elementToggler.classList.remove('toggler-disable');
}

export function disableMenu() {
  const elementHamburger = document.querySelector('.hamburger');
  elementHamburger.classList.add('hamburger-disable');

  const elementToggler = document.querySelector('.toggler');
  elementToggler.classList.add('toggler-disable');
}

