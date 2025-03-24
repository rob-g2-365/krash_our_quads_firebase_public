
import { expect, test, describe, vi } from 'vitest';
import { cyrb53, setMeetingId, verifyMeetingId, setMeetingIdHash, verifyAdmin, isAdminMode, setAdminMode } from '../../public/scripts/meeting_id_auth.js';

const TEST_MEETING_ID='PX120ER';
const TEST_MEETING_ID_HASH = cyrb53(TEST_MEETING_ID);
const TEST_ADMIN_ID = '12admin';

describe('Meeting ID Authorization Test Suite', ()=> {
  test('Test/Verify MeetingID', ()=> {
    setMeetingId(TEST_MEETING_ID);
    expect(verifyMeetingId('testname', TEST_MEETING_ID)).toBeTruthy();    
  });

  test('Test/Verify MeetingID Hash', ()=> {
    setMeetingIdHash({hash:TEST_MEETING_ID_HASH});
    expect(verifyMeetingId('testname', TEST_MEETING_ID)).toBeTruthy();    
  });

  // The admin should not be able to use the regular meeting id.
  test('Test/Verify MeetingID Admin', ()=> {
    setMeetingId(TEST_MEETING_ID);
    expect(verifyMeetingId('admin', TEST_MEETING_ID)).toBeFalsy();
  });

  test('Test Verify Admin', ()=>{
    vi.mock('../../public/scripts/meeting_id_auth_constants.js', ()=>({
      MEETING_ID_ADMIN_HASH: 954725761526502
    }));
    expect(verifyAdmin('admin',TEST_ADMIN_ID )).toBeTruthy();
  });

  test('Test isAdminMode', ()=>{
    setAdminMode(true);
    expect(isAdminMode()).toBeTruthy();
    setAdminMode(false);
    expect(isAdminMode()).toBeFalsy();
  })
});

