import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

import { store } from './App';
import { setCurrentUser } from './store/auth/authActions';

const config = {
  apiKey: 'AIzaSyBprNIEWqe47aJOFKd8Py57dGnZ025a2fk',
  authDomain: 'pact-85c8b.firebaseapp.com',
  databaseURL: 'https://pact-85c8b.firebaseio.com',
  projectId: 'pact-85c8b',
  storageBucket: '',
  messagingSenderId: '481474178991',
  appId: '1:481474178991:web:21784bcd3262aafa',
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        const {
          displayName,
          email,
          emailVerified,
          photoURL,
          isAnonymous,
          uid,
          providerData,
        } = user;
        // const dbUser = await currentUserData(uid);
        const userInfo = {
          displayName,
          email,
          emailVerified,
          photoURL,
          isAnonymous,
          uid,
          providerData,
        };
        store.dispatch(setCurrentUser(userInfo));
      } else {
        // User is logged out
        store.dispatch(setCurrentUser(null));
      }
    });
  }

  async currentUserData(uid) {
    const dbUser = await this.db.collection('users').doc(uid).get();
    return dbUser.data();
  }

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  // auth
  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(displayName, email, password, username) {
    const usernameExist = await this.db.collection('users')
      .where('username', '==', username)
      .get();
    if (!usernameExist.empty) {
      return { success: false, message: 'Username already exists' };
    }
    await this.auth.createUserWithEmailAndPassword(email, password);
    await this.auth.currentUser.updateProfile({
      displayName,
    });
    await this.db.doc(`users/${this.auth.currentUser.uid}`).set({ displayName, email, username });
    return { success: true };
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  async deleteUser() {
    await this.auth.currentUser.delete();
  }

  // examples
  addQuote(quote) {
    if (!this.auth.currentUser) {
      return false;
    }

    return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
      quote,
    });
  }

  async getCurrentUserQuote() {
    const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get();
    return quote.get('quote');
  }

  // habit
  addHabit(habit) {
    if (!this.auth.currentUser) {
      return false;
    }
    const newHabit = {
      ...habit,
      user: this.auth.currentUser.uid,
    };
    return this.db.collection('habits').add(newHabit);
  }

  async getHabits() {
    if (!this.auth.currentUser) {
      return null;
    }
    const user = this.auth.currentUser.uid;
    const habits = await this.db.collection('habits')
      .where('user', '==', user)
      .get();
    const habitsArr = [];
    habits.forEach((doc) => {
      habitsArr.push({ ...doc.data(), id: doc.id });
    });
    return habitsArr;
  }

  async getHabit(id) {
    const habit = await this.db.collection('habits').doc(id).get();
    return { ...habit.data(), id };
  }

  // pacts
  async addPact(pact, habit, username, displayName) {
    // might have to nest the pact in both user's habit objects and update both when necessary
    if (!this.auth.currentUser) {
      return false;
    }
    const users = await this.db.collection('users')
      .where('username', '==', username)
      .get();
    let response;
    if (users.empty) {
      return null;
    }
    users.forEach(async (doc) => {
      const userData = doc.data();
      const newPact = {
        ...pact,
        users: [this.auth.currentUser.uid, doc.id],
        pending: doc.id,
        displayNames: [displayName, userData.displayName],
        habitIds: [habit.id],
        habitNames: [habit.name],
      };
      const batch = this.db.batch();
      const pactRef = this.db.collection('pacts').doc();
      batch.set(pactRef, newPact);
      const habitRef = this.db.collection('habits').doc(habit.id).collection('pacts').doc(pactRef.id);
      batch.set(habitRef, newPact);
      response = await batch.commit();
    });
    console.log(response);
    return response;
  }

  async getUserPacts() {
    const { currentUser } = this.auth;
    if (!currentUser) {
      return false;
    }
    const pacts = await this.db.collection('pacts')
      .where('users', 'array-contains', currentUser.uid)
      .get();
    const pactsArr = [];
    pacts.forEach((doc) => {
      pactsArr.push({ ...doc.data(), id: doc.id });
    });
    return pactsArr;
  }

  async getHabitPacts(habitId) {
    const { currentUser } = this.auth;
    if (!currentUser) {
      return false;
    }
    const pacts = await this.db.collection('pacts')
      .where('habitIds', 'array-contains', habitId)
      .get();
    const pactsArr = [];
    pacts.forEach((doc) => {
      pactsArr.push({ ...doc.data(), id: doc.id });
    });
    return pactsArr;
  }

  async declinePact(pactKey, habitKey) {
    // delete pact of key
    // delete pact in habit of key
    try {
      await this.db.collection('pacts').doc(pactKey).delete();
      await this.db.collection('habits').doc(habitKey).collection('pacts').doc(pactKey)
        .delete();
      return { message: 'success' };
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}

export default new Firebase();
