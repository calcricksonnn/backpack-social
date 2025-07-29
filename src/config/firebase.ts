import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import Constants from 'expo-constants';

const { firebaseConfig } = Constants.manifest!.extra!; 
// make sure to add your config in app.json→extra

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);