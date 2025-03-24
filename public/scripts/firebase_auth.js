// eslint-disable-next-line no-undef
const fb = firebase;

export function googleLogin(update) {  
  const provider = new fb.auth.GoogleAuthProvider();
  // eslint-disable-next-line  no-unused-vars
  fb.auth().signInWithPopup(provider).then(result => {
    update();
  }).catch((error)=>{
    console.error('Google sign-in error',error);
  });
}

export function logout(update) {
  fb.auth().signOut().then(() => {
    // Sign-out successful.
    update();
  }).catch((error) => {
    // An error happened.
    console.error('Sign-out error', error);
  });
}

export function getFirebaseDisplayName() {
  const auth = fb.auth();
  const user = auth.currentUser;
  if (user) {
    const displayName = user.displayName; 
    return displayName;
  }
  return null;
}

export function getFirebaseUid() {
  const auth = fb.auth();
  const user = auth.currentUser;
  if (user) {
    const uid = user.uid; 
    return uid;
  }
  return null;
}