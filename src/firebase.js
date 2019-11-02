import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

import { store } from './App';
import { setCurrentUser } from './store/auth/authActions';

const config = {
  apiKey: 'AIzaSyBtzSqQkdr9uCf0IWVYn4C1asjvLwLOBio',
  authDomain: 'less-plastic.firebaseapp.com',
  databaseURL: 'https://less-plastic.firebaseio.com',
  projectId: 'less-plastic',
  storageBucket: '',
  messagingSenderId: '481474178991',
  appId: '1:630411517821:web:ad47f11a59f8451a1ff614',
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
        const userInfo = {
          displayName,
          email,
          emailVerified,
          photoURL,
          isAnonymous,
          uid,
          providerData,
        };
        console.log({ userInfo });
        store.dispatch(setCurrentUser(userInfo));
      } else {
        // User is logged out
        store.dispatch(setCurrentUser(null));
        console.log('User is logged out');
      }
    });
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

  async register(displayName, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName,
    });
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
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

  // brand
  addBrand(brand) {
    if (!this.auth.currentUser) {
      return false;
    }
    return this.db.collection('brands').add(brand);
  }

  async getBrands() {
    const brands = await this.db.collection('brands').get();
    const brandsArr = [];
    brands.forEach((doc) => {
      brandsArr.push({ ...doc.data(), id: doc.id });
    });
    return brandsArr;
  }

  async getBrand(id) {
    const brand = await this.db.collection('brands').doc(id).get();
    return { ...brand.data(), id };
  }

  // rating
  addRating(positive, brand) {
    console.log(this.auth.currentUser);
    const rating = {
      brand,
      positive,
      user: '',
    };
    // this.db.collection('ratings').add(rating);
  }
}

export default new Firebase();
