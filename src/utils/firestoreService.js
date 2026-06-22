import { db } from '../config/firebase'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  deleteDoc,
  collectionGroup,
} from 'firebase/firestore'

const normalizeDoc = (docSnap) => {
  const data = docSnap.data()
  if (!data) return null

  const idValue = data.id ?? docSnap.id
  const parsedId = Number(idValue)

  return {
    ...data,
    id: Number.isFinite(parsedId) ? parsedId : String(idValue),
  }
}

const normalizeCollection = (querySnapshot) => {
  return querySnapshot.docs.map((docSnap) => normalizeDoc(docSnap)).filter(Boolean)
}

/**
 * Read a single document from Firestore.
 */
export const getData = async (collectionName, docId) => {
  const docRef = doc(db, collectionName, docId)
  const snapshot = await getDoc(docRef)
  return snapshot.exists() ? snapshot.data() : null
}

/**
 * Read all documents from a Firestore collection.
 */
export const getCollectionData = async (collectionName) => {
  const collectionRef = collection(db, collectionName)
  const querySnapshot = await getDocs(collectionRef)
  return normalizeCollection(querySnapshot)
}

/**
 * Create or overwrite a Firestore document.
 */
export const saveData = async (collectionName, docId, payload) => {
  const docRef = doc(db, collectionName, docId)
  await setDoc(docRef, payload, { merge: true })
  return payload
}

/**
 * Update an existing Firestore document.
 */
export const updateData = async (collectionName, docId, payload) => {
  const docRef = doc(db, collectionName, docId)
  await updateDoc(docRef, payload)
  return payload
}

/**
 * Delete a Firestore document.
 */
export const deleteData = async (collectionName, docId) => {
  const docRef = doc(db, collectionName, docId)
  await deleteDoc(docRef)
}

/**
 * Subscribe to a single Firestore document for live updates.
 */
export const subscribeToDocument = (collectionName, docId, callback, errorCallback) => {
  const docRef = doc(db, collectionName, docId)
  return onSnapshot(docRef, (snapshot) => {
    callback(snapshot.exists() ? snapshot.data() : null)
  }, errorCallback)
}

/**
 * Subscribe to a Firestore collection for live updates.
 */
export const subscribeToCollection = (collectionName, callback, errorCallback) => {
  const collectionRef = collection(db, collectionName)
  const collectionQuery = query(collectionRef)
  return onSnapshot(collectionQuery, (snapshot) => {
    callback(normalizeCollection(snapshot))
  }, errorCallback)
}

/**
 * Create a new Firestore document with an automatically generated ID.
 */
export const createData = async (collectionName, payload) => {
  const collectionRef = collection(db, collectionName)
  const docRef = doc(collectionRef)
  const item = { ...payload, id: docRef.id }
  await setDoc(docRef, item)
  return item
}
