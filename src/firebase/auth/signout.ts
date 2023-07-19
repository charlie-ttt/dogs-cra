import firebase_app from "../config";
import { getAuth, signOut as firebaseSignOut } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signOut() {
  let result = null,
    error = null;
  try {
    result = await firebaseSignOut(auth);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
