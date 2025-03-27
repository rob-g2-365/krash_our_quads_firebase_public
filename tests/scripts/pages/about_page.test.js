import 'global-jsdom/register';
import { beforeEach, describe, expect, test } from 'vitest';
import {AboutPage} from '../../../public/scripts/pages/about_page.js';

describe('About page test suite.', () =>{
  beforeEach(() => {
    document.body.innerHTML = '<!DOCTYPE html><body><div class="js-container"></div></body>';
  });

  test('DOM initialized', ()=>{
    expect(document).toBeTruthy();
  });

  test('Test that the about page is shown.',() => {
    const about = new AboutPage();
    about.show(null);
    const innerHTML = document.body.innerHTML;
    expect( innerHTML.includes('Gorsegner')).toBeTruthy();
  });
});

