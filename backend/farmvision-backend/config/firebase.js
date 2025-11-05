const admin = require('firebase-admin');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// Load service account key
const serviceAccount = require(path.join(
  __dirname,
  '../serviceAccountKey.json'
));

// Initialize Firebase Admin SDK
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  projectId: process.env.FIREBASE_PROJECT_ID
});

// Initialize Database
const db = admin.database();

// Initialize Storage
const storage = admin.storage();

// Initialize Auth
const auth = admin.auth();

// Test connection
db.ref('.info/connected').on('value', (snapshot) => {
  if (snapshot.val() === true) {
    console.log('✅ Firebase Realtime Database connected');
  } else {
    console.log('❌ Firebase Realtime Database disconnected');
  }
});

module.exports = {
  app,
  db,
  auth,
  storage,
  admin
};
