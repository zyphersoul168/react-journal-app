import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';
import { types } from '../types/types';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    const userRef = collection(db, `${uid}/journal/notes`);

    // add note to database
    const noteRef = await addDoc(userRef, newNote);

    dispatch(activeNote(noteRef.id, newNote));
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});
