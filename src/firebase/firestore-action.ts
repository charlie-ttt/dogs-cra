import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./config";

export interface LikedPhotos {
  [key: string]: string;
}

export async function likePhoto(userId: string, photos: LikedPhotos) {
  try {
    await setDoc(
      doc(db, "users", userId),
      {
        liked_photos: photos,
      },
      { merge: true }
    );
  } catch (e) {
    console.error("Error merging document: ", e);
  }
}

export async function handleSave({
  userId,
  breeds,
}: {
  userId: string;
  breeds: string[];
}) {
  try {
    await setDoc(doc(db, "users", userId), {
      favorite_breeds: breeds,
    });
  } catch (e) {
    console.error("Error saving favorites: ", e);
  }
}

export async function getUserData(userId: string) {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }

  return {};
}
