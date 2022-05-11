// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import type { FirebaseError } from 'firebase/app';
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import type { User, NextOrObserver } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAizcfNUJ92WZDG5rbSZzZA_DNbafinZu8',
  authDomain: 'crwn-clothing-db-v2-8a169.firebaseapp.com',
  projectId: 'crwn-clothing-db-v2-8a169',
  storageBucket: 'crwn-clothing-db-v2-8a169.appspot.com',
  messagingSenderId: '1005700742317',
  appId: '1:1005700742317:web:eda77758b190a653e65a24',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

export const db = getFirestore(firebaseApp);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation: AdditionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  // if user data does not exist, create / set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      const error = err as Error | FirebaseError;
      console.log('Error creating the user', error.message);
    }
  }

  // if user data exists, return userDocRef
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');

  // Create a query against the collection.
  const q = query(collectionRef); // ex. const q = query(citiesRef, where("state", "==", "CA"));

  // Execute a query
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

/* Data Seeding */
export const addCollectionAndDocuments = async <T extends Data>(
  collectionKey: string,
  shopData: T[]
) => {
  const collectionRef = collection(db, collectionKey);

  const batch = writeBatch(db);

  shopData.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};
/*
addCollectionAndDocuments('categories', SHOP_DATA)
*/

/* Types */
type AdditionalInformation = {
  displayName?: string;
};

type Data = {
  title: string;
};
