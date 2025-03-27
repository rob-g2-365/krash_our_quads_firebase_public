import { Database } from "../../public/scripts/database.js";

export class DatabaseMock extends Database {
  #databaseUserInfo = [];
  #hash;

  writeUserData(callback, userInfo) {
    const foundRecord = this.#databaseUserInfo.find((record)=> {
      return record.getName() === userInfo.getName();
    });
    if(foundRecord) {
      foundRecord.setDataBaseRecord(userInfo.getDataBaseRecord());
    } else {
      this.#databaseUserInfo.push(userInfo);
    }
    setTimeout(callback, 0);
    // callback();  
  }
  
  readUserData(callback, userName) {
    const foundRecord = this.#databaseUserInfo.find((record)=> {
      return record.getName() === userName;
    });
    if(foundRecord) {
      setTimeout(callback, 0, foundRecord.getDataBaseRecord());
    } else {
      // callback(null);
      setTimeout(callback, 0, null);
    }
  }
  
  deleteUserData(callback, userInfo) {
    const index = this.#databaseUserInfo.findIndex((record)=> {
      return record.getName() === userInfo.getName();
    });

    if(index >=0) {
      this.#databaseUserInfo.splice(index);
    } 
    setTimeout(callback, 0);
  }

  async cleanAllUserData() {
    this.#databaseUserInfo = [];
  }

  readAllChannels(callback) {
    const recordArray = this.#databaseUserInfo.map((userInfo )=>{
      return userInfo.getDataBaseRecord();
    });
    setTimeout(callback, 0, recordArray);
  }

  // Note that this takes a userInfoArray.
  // Not in Database class.  In test code only.
  writeAllChannels(userInfoArray) {
    this.#databaseUserInfo = userInfoArray;
  }
  
  readMeetingHash(callback) {
    setTimeout(callback, 0, this.#hash);
  }
  
   // eslint-disable-next-line no-unused-vars
  writeMeetingHash(callback, hash) {
    this.#hash = hash;
    setTimeout(callback, 0);
  }
}

