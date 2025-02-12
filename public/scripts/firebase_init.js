export let app = null;

export function firebaseInit(callback) {
  document.addEventListener('DOMContentLoaded', function () {
    // const loadEl = document.querySelector('#load');
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // // The Firebase SDK is initialized and available here!
    //
    // firebase.auth().onAuthStateChanged(user => { });
    // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
    // firebase.firestore().doc('/foo/bar').get().then(() => { });
    // firebase.functions().httpsCallable('yourFunction')().then(() => { });
    // firebase.messaging().requestPermission().then(() => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
    // firebase.analytics(); // call to activate
    // firebase.analytics().logEvent('tutorial_completed');
    // firebase.performance(); // call to activate
    //
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

    try {
      app = firebase.app();
      let features = [
        'auth',
        'database',
        'firestore',
        // 'functions',
        // 'messaging',
        // 'storage',
        // 'analytics',
        // 'remoteConfig',
        // 'performance',
      ].filter(feature => typeof app[feature] === 'function');
      // loadEl.textContent = `Firebase SDK loaded with ${features.join(', ')}`;
      console.log(`Firebase SDK loaded with ${features.join(', ')}`);
      if (callback) {
        callback();
      }
    } catch (e) {
      // loadEl.textContent = 'Error loading the Firebase SDK, check the console.';
      console.error('Error loading the Firebase SDK, check the console.', e);
    }
  });
}


