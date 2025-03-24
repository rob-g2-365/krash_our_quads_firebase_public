import 'global-jsdom/register';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { BasePage, CLASS_BUTTON_OK, CLASS_BUTTON_CANCEL  } from '../../../public/scripts/pages/base_page.js';

const ID_TEST='id-test';
describe('About page test', () => {
  beforeEach(() => {
    document.body.innerHTML = `<!DOCTYPE html>
    <body>
      <div class="js-container">
      </div>
    </body>`;
  });

  test('DOM initialized', () => {
    expect(document).toBeTruthy();
  });

  test('Test that the page is shown.', () => {
    const page = new BasePage();
    page.showOk('<p>Ok test page.</p>', () => { });
    const innerHTML = document.body.innerHTML;
    expect(innerHTML.includes('test page')).toBeTruthy();
  });

  test('Test OK button on Ok Page.', () => {
    const page = new BasePage();
    const mockCallback = vi.fn();
    page.showOk('<p>Ok test page.</p>', mockCallback);
    const okButton = document.querySelector('.' + CLASS_BUTTON_OK);
    okButton.click();
    expect(mockCallback).toHaveBeenCalled();
  });
  
  test('Test OK button on Ok/Cancel Page.', () => {
    const page = new BasePage();
    const mockOkCallback = vi.fn();
    page.showOkCancel('<p>Ok/Cancel test page.</p>', mockOkCallback, () => { });

    const okButton = document.querySelector('.' + CLASS_BUTTON_OK);
    okButton.click();
    expect(mockOkCallback).toHaveBeenCalled();
  });

  test('Test Cancel button on Ok/Cancel Page.', () => {
    const page = new BasePage();
    const mockCancelCallback = vi.fn();
    page.showOkCancel('<p>Ok/Cancel test page.</p>', () => { }, mockCancelCallback);

    const cancelButton = document.querySelector('.' + CLASS_BUTTON_CANCEL);
    cancelButton.click();
    expect(mockCancelCallback).toHaveBeenCalled();
  });

  test('Test registerInputById and unRegisterInputById', ()=>{
    const page = new BasePage();
    const mainspaceElement = document.querySelector(".js-container");
    mainspaceElement.innerHTML = `
      <label class="input-label" for="${ID_TEST}">Name:</label> </td>
      <input type="text" id="${ID_TEST}" name="${ID_TEST}"></input> </td>
    `;

    const mockCallback = vi.fn();
    const listener = page.registerInputById(ID_TEST, mockCallback);

    const elementTextBox = document.getElementById(ID_TEST);
    elementTextBox.value = 'fahdfj'
    const event1 = new Event('input', {bubbles:true, cancelable: true});
    elementTextBox.dispatchEvent(event1);

    expect(mockCallback).toHaveBeenCalled();

    page.unRegisterInputById(listener);
    const event2 = new Event('input', {bubbles:true, cancelable: true});
    elementTextBox.dispatchEvent(event2);
    elementTextBox.dispatchEvent(event1);
    
    expect(mockCallback).toHaveBeenCalledOnce();
  });
});


