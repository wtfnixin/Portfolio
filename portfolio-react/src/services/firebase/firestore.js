import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc,
  serverTimestamp,
  orderBy,
  query
} from "firebase/firestore";
import { db } from "./config";

// --- Projects ---
const PROJECTS_COLLECTION = "projects";

export const getProjects = async () => {
  const q = query(collection(db, PROJECTS_COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addProject = async (data) => {
  return addDoc(collection(db, PROJECTS_COLLECTION), {
    ...data,
    createdAt: serverTimestamp()
  });
};

export const updateProject = async (id, data) => {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  return updateDoc(docRef, data);
};

export const deleteProject = async (id) => {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  return deleteDoc(docRef);
};

// --- Messages ---
const MESSAGES_COLLECTION = "messages";

export const getMessages = async () => {
  const q = query(collection(db, MESSAGES_COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// --- About ---
const ABOUT_COLLECTION = "about";
const ABOUT_DOC_ID = "profile"; // Single document strategy

export const getAbout = async () => {
  const docRef = doc(db, ABOUT_COLLECTION, ABOUT_DOC_ID);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return snapshot.data();
  } else {
    return { bio: "", skills: [] };
  }
};

export const updateAbout = async (data) => {
  const docRef = doc(db, ABOUT_COLLECTION, ABOUT_DOC_ID);
  // Using set with merge to create if doesn't exist
  const { setDoc } = await import("firebase/firestore"); 
  return setDoc(docRef, data, { merge: true });
};
