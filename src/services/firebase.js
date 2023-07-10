 
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {collection, getDocs, getFirestore} from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyCzViviIPNYEHJxwBgpg82aNJ-A_BSc0V4",
  authDomain: "to-do-c613d.firebaseapp.com",
  projectId: "to-do-c613d",
  storageBucket: "to-do-c613d.appspot.com",
  messagingSenderId: "727257530054",
  appId: "1:727257530054:web:b1d1e70c2884e8604421c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const db = getFirestore(app)
export const auth = getAuth(app);

//Storage

export async function uploadImageAndGetURL(file, currentUser) {
  const fileRef = ref(storage, `avatares/${currentUser.email}/${file.name}`);

  await uploadBytes(fileRef, file)

  const url = await getDownloadURL(fileRef)

  return url
}

//FireStore

export async function getCollectionTasks(userId) {
  const collectionRef = collection(db, userId);
  const snapshot = await getDocs(collectionRef);

  const collectionList = snapshot.docs.map((doc) => {
    return doc.data()
  })

  return collectionList
  
}