import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyCEHmXzlFWxJZDPnEmy_Gqk_QajAaGkxBQ',
  authDomain: 'blab-8f233.firebaseapp.com',
  databaseURL: 'https://blab-8f233.firebaseio.com',
  projectId: 'blab-8f233',
  storageBucket: 'blab-8f233.appspot.com',
  messagingSenderId: '1019636621723',
};

class Firebase {
  constructor() {
    // app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) => (
    this.auth.createUserWithEmailAndPassword(email, password)
  );

  doSignInWithEmailAndPassword = (email, password) => (
    this.auth.signInWithEmailAndPassword(email, password)
  );

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => (
    this.auth.currentUser.updatePassword(password)
  );

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');
}

export default Firebase;
