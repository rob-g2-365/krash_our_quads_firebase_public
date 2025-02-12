export function googleLogin(update) {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(result => {
    update();
  }).catch((error)=>{
    console.error('Google sign-in error',error);
  });
}

export function logout(update) {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    update();
  }).catch((error) => {
    // An error happened.
    console.error('Sign-out error', error);
  });
}

export function getFirebaseDisplayName() {
  const auth = firebase.auth();
  const user = auth.currentUser;
  if (user) {
    const displayName = user.displayName; 
    return displayName;
  }
  return null;
}

export function getFirebaseUid() {
  const auth = firebase.auth();
  const user = auth.currentUser;
  if (user) {
    const uid = user.uid; 
    return uid;
  }
  return null;
}