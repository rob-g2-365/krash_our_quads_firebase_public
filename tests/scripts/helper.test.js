import { expect, test, describe } from 'vitest';
import { isAscii, validateUserName} from '../../public/scripts/helper.js';

const TEST_VALUES = [
  {s: 'Joe Momma', i:true, v:true},
  {s: '1234', i:true, v:true},
  {s: "\uD83D\uDE00", i:false, v: false},
  {s: 's', i:true, v:false},
  {s: '  s  ', i:true, v: false}
];

describe('Helper Test Suite', () =>{
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
