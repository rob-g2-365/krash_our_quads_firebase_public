
import { intializeEventListeners, showHomeInformation, updateMenuState} from './main_menu_handler.js';
import {readFireStoreMeetingHash} from './firebase_database.js';
import { firebaseInit } from './firebase_init.js';
import { setMeetingIdHash} from './meeting_id_auth.js';

firebaseInit(()=>{
  readFireStoreMeetingHash(setMeetingIdHash);
});
showHomeInformation();
intializeEventListeners();
updateMenuState();
