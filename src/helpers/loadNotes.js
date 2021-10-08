import { db } from "../firebase/config"
import { collection, getDocs } from '@firebase/firestore'

export const loadNotes = async (uid) => {
  const notesSnap = await getDocs(collection(db, `${uid}/journal/notes`));
  const notes = [];

  notesSnap.forEach(note => {
    notes.push({
      id: note.id,
      ...note.data(),
    })
  });

  return notes;
}