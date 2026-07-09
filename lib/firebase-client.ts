/**
 * Firebase client SDK, Auth only (the admin portal's Firestore access goes
 * through the Admin SDK server-side; nothing reads or writes Firestore
 * directly from the browser). Safe to import even with no Firebase env vars
 * set: initializeApp/getAuth don't validate config eagerly, they only fail
 * when an auth call is actually made, and every page that imports this is
 * rendered dynamically, never at build time.
 */
import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
