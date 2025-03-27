
import { intializeEventListeners, showHomeInformation, updateMenuState} from './main_menu_handler.js';
import { firebaseInit } from './firebase_init.js';
import { setMeetingIdHash} from './meeting_id_auth.js';
import { initializeDatabase } from './database.js';
import { FireBaseDataBase } from './firebase_database.js';
import { getDatabase } from './database.js';

initializeDatabase(new FireBaseDataBase);

firebaseInit(()=>{
  getDatabase().readMeetingHash(setMeetingIdHash);
});

showHomeInformation();
intializeEventListeners();
updateMenuState();
