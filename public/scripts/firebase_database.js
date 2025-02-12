import { getGlobalUserInfo, setArrayOfUsers } from './user_info.js';

const COLLECTION_TAG_USER = 'USER_INFO';
const COLLECTION_TAG_MEETING = 'MEETING';
const DOCTAG_HASH = 'meeting_id_hash';

export function writeFireStoreUserData(callback) {
  const uid = getGlobalUserInfo().getName();
  const db = firebase.firestore();
  const colRef = db.collection(COLLECTION_TAG_USER);
  const docRef = colRef.doc(uid);
  const userInfoRecord = getGlobalUserInfo().getDataBaseRecord();
  docRef.set(userInfoRecord).then(() => {
    if (callback) {
      callback();
    }
  }).catch((error) => {
    console.error("Error writing user document: ", error);
  });
}

export function readFireStoreUserData(callback) {
  const uid = getGlobalUserInfo().getName();
  const db = firebase.firestore();
  const colRef = db.collection(COLLECTION_TAG_USER);
  const docRef = colRef.doc(uid);
  docRef.get().then((doc) => {
    if (doc.exists) {
      getGlobalUserInfo().setDataBaseRecord(doc.data());
    }
    if (callback) {
      callback();
    }
  }).catch((error) => {
    console.error("Error reading user document: ", error);
  });
}

export function deleteFireStoreUserData(callback) {
  const uid = getGlobalUserInfo().getName();
  const db = firebase.firestore();
  const colRef = db.collection(COLLECTION_TAG_USER);
  const docRef = colRef.doc(uid);
  docRef.delete().then(() => {
    getGlobalUserInfo().clearChannelInformation();
    if (callback) {
      callback();
    }
  }).catch((error) => {
    console.error("Error deleting user document: ", error);
  });
}

export async function cleanAllFireStoreUserData() {
  const db = firebase.firestore();
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

export function readFireStoreAllChannels(callback) {
  const db = firebase.firestore();
  const colRef = db.collection(COLLECTION_TAG_USER);
  colRef.get().then((snapshot) => {
    const dataArray = snapshot.docs.map((doc) => {
      return doc.data();
    });
    setArrayOfUsers(dataArray);
    if (callback) {
      callback(dataArray);
    }
  }).catch((error) => {
    console.error("Error reading all user data: ", error);
  });
}

export function readFireStoreMeetingHash(callback) {
  const db = firebase.firestore();
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

export function writeFireStoreMeetingHash(callback, hash) {
  const db = firebase.firestore();
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
