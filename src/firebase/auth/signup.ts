import firebase_app from "../config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  UserCredential,
} from "firebase/auth";

const auth = getAuth(firebase_app);

interface SignUpResponse {
  result: UserCredential | null;
  error: unknown;
}

export default async function signUp(
  email: string,
  password: string
): Promise<SignUpResponse> {
  let result = null;
  let error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
