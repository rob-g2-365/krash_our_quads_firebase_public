export class Page {
  #callbackOk;
  #callbackCancel;
  #listenerInfoOk;
  #listenerInfoCancel;

  show(callback) {
    console.error("Not Implemented.");
  }

  showOk(html, callback) {
    this.#callbackOk = callback;
    const mainspaceElement = document.querySelector(".js-container");
    mainspaceElement.innerHTML = html + '<a class="btn js-btn-ok">OK</a>';
    this.#listenerInfoOk = this.registerListener('.js-btn-ok', this.#listenerOkButton);
  }

  showOkCancel(html, callbackOk, callbackCancel) {
    this.#callbackOk = callbackOk;
    this.#callbackCancel = callbackCancel;
    const mainspaceElement = document.querySelector(".js-container");
    mainspaceElement.innerHTML = html + `
    <nav>
      <a class="btn js-btn-ok">OK</a>
      <a class="btn js-btn-cancel">Cancel</a>
    </nav>
    `;
    this.#listenerInfoOk = this.registerListener('.js-btn-ok', this.#listenerOkButton);
    this.#listenerInfoCancel = this.registerListener('.js-btn-cancel', this.#listenerCancelButton);
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

  #listenerOkButton(event) {
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
}