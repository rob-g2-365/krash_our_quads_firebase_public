// This file contains the functions that interact with the firebase database.
const COLLECTION_TAG_USER = 'USER_INFO';
const COLLECTION_TAG_MEETING = 'MEETING';
const DOCTAG_HASH = 'meeting_id_hash';

// eslint-disable-next-line no-undef
const fb = firebase;

export class FireBaseDataBase {
  writeUserData(callback, userInfo) {
    const uid = userInfo.getName();
    const db = fb.firestore();
    const colRef = db.collection(COLLECTION_TAG_USER);
    const docRef = colRef.doc(uid);
    const userInfoRecord = userInfo.getDataBaseRecord();
    docRef.set(userInfoRecord).then(() => {
      if (callback) {
        callback();
      }
    }).catch((error) => {
      console.error("Error writing user document: ", error);
    });
  }

  readUserData(callback, username) {
    const db = fb.firestore();
    const colRef = db.collection(COLLECTION_TAG_USER);
    const docRef = colRef.doc(username);
    docRef.get().then((doc) => {
      let userRecord = null;
      if (doc.exists) {
        userRecord = doc.data();
      }
      if (callback) {
        callback(userRecord);
      }
    }).catch((error) => {
      console.error("Error reading user document: ", error);
    });
  }

  deleteFireStoreUserData(callback, userInfo) {
    const uid = userInfo.getName();
    const db = fb.firestore();
    const colRef = db.collection(COLLECTION_TAG_USER);
    const docRef = colRef.doc(uid);
    docRef.delete().then(() => {
      if (callback) {
        callback();
      }
    }).catch((error) => {
      console.error("Error deleting user document: ", error);
    });
  }

  async cleanAllUserData() {
    const db = fb.firestore();
    const colRef = db.collection(COLLECTION_TAG_USER);
    const deleteBatch = db.batch();
    // Required for efficient pagination or so says google AI
    const query = colRef.orderBy('__name__');
    try {
      // Limit to 500 for batching
      let querySnapshot = await query.limit(500).get();
      while (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
          deleteBatch.delete(doc.ref);
        });
        await deleteBatch.commit();
        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        querySnapshot = await query.startAfter(lastDoc).limit(500).get();
      }
    } catch (error) {
      console.error("Error cleaning all user data: ", error);
    }
  }

  readAllChannels(callback) {
    const db = fb.firestore();
    const colRef = db.collection(COLLECTION_TAG_USER);
    colRef.get().then((snapshot) => {
      const dataArray = snapshot.docs.map((doc) => {
        return doc.data();
      });
      if (callback) {
        callback(dataArray);
      }
    }).catch((error) => {
      console.error("Error reading all user data: ", error);
    });
  }

  readMeetingHash(callback) {
    const db = fb.firestore();
    const colRef = db.collection(COLLECTION_TAG_MEETING);
    const docRef = colRef.doc(DOCTAG_HASH);
    docRef.get().then((doc) => {
      if (callback && doc.exists) {
        callback(doc.data());
      }
    }).catch((error) => {
      console.error("Error reading meeting id document: ", error);
    });
  }

  writeMeetingHash(callback, hash) {
    const db = fb.firestore();
    const colRef = db.collection(COLLECTION_TAG_MEETING);
    const docRef = colRef.doc(DOCTAG_HASH);
    docRef.set({ hash }).then(() => {
      if (callback) {
        callback();
      }
    }).catch((error) => {
      console.error("Error writing meeting id document: ", error);
    });
  }
}
