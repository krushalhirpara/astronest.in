import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2vxNxUWPEB5NHepgeQtZi9BicWmfOp9E",
  authDomain: "astronest-cc945.firebaseapp.com",
  projectId: "astronest-cc945",
  storageBucket: "astronest-cc945.firebasestorage.app",
  messagingSenderId: "875253507593",
  appId: "1:875253507593:web:13a664112854dcdfe4bad8",
  measurementId: "G-0YKKRE0ZPR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth & Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();