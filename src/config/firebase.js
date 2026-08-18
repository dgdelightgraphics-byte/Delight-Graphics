// firebase configuration and initialization
// Paste your Firebase values into the project's .env file (root) under the VITE_* keys.
// Get the values from Firebase Console -> Project settings -> Your apps -> SDK setup and config.
// After editing .env, restart the Vite dev server so `import.meta.env` picks up changes.

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Required environment variable names (must start with VITE_ for Vite to expose them)
const REQUIRED_ENV = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

// Validate presence of required env vars and fail fast with a clear message
const missing = REQUIRED_ENV.filter((key) => {
  const val = import.meta.env[key];
  return !val || val === '';
});

if (missing.length > 0) {
  const msg = `Missing Firebase environment variables: ${missing.join(", ")}.\nPlease paste the values into your .env file and restart the dev server.`;
  // Throwing here prevents app code from silently running without proper config
  throw new Error(msg);
}

// Build config from Vite environment (do NOT hardcode keys in source)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (err) {
  // If Firebase fails to initialize, surface a clear error for debugging
  console.error('Firebase initialization error:', err);
  throw err;
}

// Prepared exports for Authentication, Firestore and Storage integration
const auth = getAuth(app);
const db = getFirestore(app);
// Create storage instance with default settings. The SDK handles retries internally.
// We ensure env variable presence earlier; no direct retry config is exposed in modular SDK.
const storage = getStorage(app);

export { app, auth, db, storage };
