import { initializeApp } from "firebase/app";

import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD-lOuINv8dz1cbCq-0_m1QOWAz1RN504k",
  authDomain: "notification-test-d46e7.firebaseapp.com",
  projectId: "notification-test-d46e7",
  storageBucket: "notification-test-d46e7.appspot.com",
  messagingSenderId: "1090394852331",
  appId: "1:1090394852331:web:8da202a6adb2e1c181e7ae",
  measurementId: "G-X0QS3HSC8R",
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);
