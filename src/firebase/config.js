import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getFunctions } from 'firebase/functions'

const firebaseConfig = {
  apiKey: 'AIzaSyAlY5wfrYcPM-8zNaIJ5VN__7wJ8Fhurnk',
  authDomain: 'test-course-9d80e.firebaseapp.com',
  databaseURL: 'https://test-course-9d80e-default-rtdb.firebaseio.com',
  projectId: 'test-course-9d80e',
  storageBucket: 'test-course-9d80e.firebasestorage.app',
  messagingSenderId: '210689947398',
  appId: '1:210689947398:web:105bf8cf9e4f9f3c1fd087',
  measurementId: 'G-NSWV4VZDQK'
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const functions = getFunctions(app)
export const googleProvider = new GoogleAuthProvider()

export default app
