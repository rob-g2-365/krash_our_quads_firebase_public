
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

export function clearMenu() {
  document.querySelector('.js-toggler').checked = false;
}
export function setMenuItemEnable(className, enable) {
  document.querySelector('.' + className).style.display = enable ? 'block' : 'none';
}


