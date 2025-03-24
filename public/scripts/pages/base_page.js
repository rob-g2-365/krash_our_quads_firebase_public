export const CLASS_BUTTON_OK = 'js-btn-ok';
export const CLASS_BUTTON_CANCEL = 'js-btn-cancel';

export class BasePage {
  #callbackOk;
  #callbackCancel;
  #listenerInfoOk;
  #listenerInfoCancel;
  #validateOkCallback;

  showOk(html, callback) {
    this.#callbackOk = callback;
    this.#validateOkCallback = () =>{ return true;};
    const mainspaceElement = document.querySelector(".js-container");
    mainspaceElement.innerHTML = html + `<a class="btn ${CLASS_BUTTON_OK}">OK</a>`;
    this.#listenerInfoOk = this.registerListener('.' + CLASS_BUTTON_OK, this.#listenerOkButton);
  }

  showOkCancelValidate(html, callbackOk, validateCallback, callbackCancel) {
    this.#callbackOk = callbackOk;
    this.#callbackCancel = callbackCancel;
    this.#validateOkCallback = validateCallback;
    const mainspaceElement = document.querySelector(".js-container");
    mainspaceElement.innerHTML = html + `
    <nav>
      <a class="btn ${CLASS_BUTTON_OK}">OK</a>
      <a class="btn ${CLASS_BUTTON_CANCEL}">Cancel</a>
    </nav>
    `;
    this.#listenerInfoOk = this.registerListener('.' + CLASS_BUTTON_OK, this.#listenerOkButton);
    this.#listenerInfoCancel = this.registerListener('.' + CLASS_BUTTON_CANCEL, this.#listenerCancelButton);
  }

  showOkCancel(html, callbackOk, callbackCancel) {
    this.showOkCancelValidate(html, callbackOk, () =>{ return true;}, callbackCancel)
  }

  #listenerOkButton(event) {
    if(!this.#validateOkCallback()) {
      return;
    }

    this.unRegisterListener(this.#listenerInfoOk);
    this.unRegisterListener(this.#listenerInfoCancel);
    this.#listenerInfoOk = null;
    this.#listenerInfoCancel = null;
    this.#callbackOk();
  }

  #listenerCancelButton(event) {
    this.unRegisterListener(this.#listenerInfoOk);
    this.unRegisterListener(this.#listenerInfoCancel);
    this.#listenerInfoOk = null;
    this.#listenerInfoCancel = null;
    this.#callbackCancel();
  }

  registerListener(className, memberListener) {
    const element = document.querySelector(className);
    const bind = memberListener.bind(this);
    element.addEventListener('click', bind);
    return { element, bind };
  }

  unRegisterListener(listenerInfo) {
    if (listenerInfo) {
      listenerInfo.element.removeEventListener('click', listenerInfo.bind);
    }
  }

  registerInputById(id, memberListener){
    const element = document.getElementById(id);
    const bind = memberListener.bind(this);
    element.addEventListener('input', bind);
    return { element, bind };
  }

  unRegisterInputById(listenerInfo) {
    if (listenerInfo) {
      listenerInfo.element.removeEventListener('input', listenerInfo.bind);
    }
  }
}