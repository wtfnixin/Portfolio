import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

export const uploadProjectImage = async (file) => {
  if (!file) throw new Error("No file provided");
  
  const storageRef = ref(storage, `projects/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
};
