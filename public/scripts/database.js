let globalDatabase = null;
export class Database {
   // eslint-disable-next-line no-unused-vars
  writeUserData(callback, userInfo) {
    console.error('writeUserData not implemented.');
  }
  
   // eslint-disable-next-line no-unused-vars
  readUserData(callback, username) {
    console.error('readUserData not implemented');
  }
  
   // eslint-disable-next-line no-unused-vars
  deleteFireStoreUserData(callback, userInfo) {
    console.error('deleteFireStoreUserData not implemented');
  }

  async cleanAllUserData() {
    console.error('cleanAllUserData not implemented.');
  }

  readAllChannels(callback) {
    console.error('readAllChannels not implemented.');
  }
  
  readMeetingHash(callback) {
    console.error('readMeetingHash not implemented.');
  }
  
   // eslint-disable-next-line no-unused-vars
  writeMeetingHash(callback, hash) {
    console.error('writeMeetingHash not implemented.');
  }
}

export function initializeDatabase(database) {
  globalDatabase = database;
}

export function getDatabase() {
  return globalDatabase;
}
