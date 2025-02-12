import { Page } from './page.js';
import { cleanAllFireStoreUserData } from '../firebase_database.js';

export class CleanAllPage extends Page {
  #callback = null;
  show(callback) {
    this.#callback = callback;
    const html = `
      <h1>Clean All Users</h1>
      <p>Are you sure you want to clean all users from the database?</p>
      `;
    this.showOkCancel(
      html,
      () => {
        cleanAllFireStoreUserData();
        this.okCallback();
      },
      callback
    );
  }

  okCallback() {
    const html = `
    <h2>All users removed from database.</h2>
    `;
    this.showOk(html, this.#callback);
  }
}

