import 'global-jsdom/register';
import { beforeEach, expect, test, describe } from 'vitest';
import { isAscii, validateUserName, enableMenu, disableMenu } from '../../public/scripts/helper';

const TEST_VALUES = [
  {s: 'Joe Momma', i:true, v:true},
  {s: '1234', i:true, v:true},
  {s: "\uD83D\uDE00", i:false, v: false},
  {s: 's', i:true, v:false},
  {s: '  s  ', i:true, v: false}
];

describe('Helper Test Suite', () =>{
  beforeEach(() => {
    document.body.innerHTML = `
    <!DOCTYPE html>
    <body>
      <div class="hamburger"></div>
      <div class="toggler"></div> 
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

  test('Test isAscii',() =>{
    TEST_VALUES.forEach((value)=>{
      expect(isAscii(value.s)).toBe(value.i);
    });
  });
  test('Test validateUserName',() =>{
    TEST_VALUES.forEach((value)=>{
        expect(validateUserName(value.s)).toBe(value.v);
    });
  });
});
