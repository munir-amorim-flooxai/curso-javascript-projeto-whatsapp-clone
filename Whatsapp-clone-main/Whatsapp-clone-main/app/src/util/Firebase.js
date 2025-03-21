const firebase = require("firebase");
require("firebase/firestore");

export class Firebase {
  constructor() {
    this._config = {
      apiKey: "AIzaSyB7iIrjP011-7RjB6FTLINDtjsKqWxbRV0",
      authDomain: "whatsapp-clone-85893.firebaseapp.com",
      projectId: "whatsapp-clone-85893",
      storageBucket: "whatsapp-clone-85893.firebasestorage.app",
      messagingSenderId: "128374770993",
      appId: "1:128374770993:web:4644e50bdeb07730a23410",
      measurementId: "G-9R285GB1NY"
    };

    this.init();
  }

  init() {
    if (!window._initializedFirebase) {
      firebase.initializeApp(this._config);

      firebase.firestore().settings({
        timestampsInSnapshots: true,
      });

      window._initializedFirebase = true;
    }
  }

  static db() {
    return firebase.firestore();
  }

  static hd() {
    return firebase.storage();
  }

  initAuth() {
    return new Promise((s, f) => {
      let provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          let token = result.credential.acessToken;
          let user = result.user;

          s({
            user,
            token,
          });
        })
        .catch((err) => {
          f(err);
        });
    });
  }
}
