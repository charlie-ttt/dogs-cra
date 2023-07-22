import { FirebaseError } from "@firebase/util";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./config";

export interface LikedPhotos {
  [key: string]: string;
}

export async function updatePhotoAction(userId: string, photos: LikedPhotos) {
  try {
    await updateDoc(doc(db, "users", userId), {
      liked_photos: photos,
    });
  } catch (e) {
    console.error("Error update liked_photos: ", e);
  }
}

interface UpdateFavoriteBreedActionResponse {
  error: unknown;
}

export async function updateFavoriteBreedAction({
  userId,
  breeds,
}: {
  userId: string;
  breeds: string[];
}): Promise<UpdateFavoriteBreedActionResponse> {
  let error = null;
  try {
    await updateDoc(doc(db, "users", userId), {
      favorite_breeds: breeds,
    });
  } catch (e) {
    error = e;
  }
  return { error };
}

interface CreateUserActionResponse {
  result: any | null;
  error: unknown;
}

export async function createUserAction({
  userId,
}: {
  userId: string;
}): Promise<CreateUserActionResponse> {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, "users", userId), {});
  } catch (e) {
    error = e;
  }
  return { result, error };
}

export async function getUserDataAction(userId: string) {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }

  return {};
}

export function formatFirebaseError(error: unknown): string {
  if (error instanceof FirebaseError) {
    return error.message;
  }
  return "something went wrong. please try again later";
}
