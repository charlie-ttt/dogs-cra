import { doc, getDoc, updateDoc } from "firebase/firestore";
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

export async function updateFavoriteBreedAction({
  userId,
  breeds,
}: {
  userId: string;
  breeds: string[];
}) {
  try {
    await updateDoc(doc(db, "users", userId), {
      favorite_breeds: breeds,
    });
  } catch (e) {
    console.error("Error saving favorites: ", e);
  }
}

export async function getUserDataAction(userId: string) {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }

  return {};
}
