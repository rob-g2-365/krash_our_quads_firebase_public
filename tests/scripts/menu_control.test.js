import 'global-jsdom/register';
import { beforeEach, expect, test, describe } from 'vitest';
import { enableMenu, disableMenu, clearMenu, setMenuItemEnable } from '../../public/scripts/menu_control.js';

describe('Helper Test Suite', () =>{
    beforeEach(() => {
      document.body.innerHTML = `
      <!DOCTYPE html>
      <body>
        <div class="hamburger"></div>
        <div>
          <input type="checkbox" class="toggler js-toggler">
        </div> 
        <div class="menu">
          <li class="js-menu-home"><a>Home</a></li>
        </div>
      </body>`;
    });
  
    test('Test enable/disable Hamburger Menu', ()=>{
      disableMenu();
      expect(document.querySelector('.hamburger-disable')).toBeTruthy();
      expect(document.querySelector('.toggler-disable')).toBeTruthy();
      enableMenu();
      expect(document.querySelector('.hamburger-disable')).toBeFalsy();
      expect(document.querySelector('.toggler-disable')).toBeFalsy();
    });

    test('Test clearMenu', ()=>{
      const element = document.querySelector('.js-toggler');
      element.checked = true;
      clearMenu();
      expect(element.checked).toBeFalsy();
    });

    test('Test setMenuItemEnable', ()=> {
      const classMenuName = 'js-menu-home';
      const element = document.querySelector('.' + classMenuName);
      setMenuItemEnable(classMenuName, true);      
      expect(element.style.display).toBe('block');
      setMenuItemEnable(classMenuName, false);      
      expect(element.style.display).toBe('none');
    });
});