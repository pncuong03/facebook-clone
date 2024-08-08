// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
import {
  API_APP_ID,
  API_AUTH_DOMAIN,
  API_KEY,
  API_MEASUREMENT_ID,
  API_MESSAGING_SENDER_ID,
  API_PROJECT_ID,
  API_STORAGE_BUCKET
} from '~/const/env'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: API_AUTH_DOMAIN,
  projectId: API_PROJECT_ID,
  storageBucket: API_STORAGE_BUCKET,
  messagingSenderId: API_MESSAGING_SENDER_ID,
  appId: API_APP_ID,
  measurementId: API_MEASUREMENT_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
