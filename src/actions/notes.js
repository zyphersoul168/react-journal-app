import Swal from "sweetalert2";

import { addDoc, deleteDoc, setDoc, collection, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import { fileUpload } from "../helpers/fileUpload";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const userRef = collection(db, `${uid}/journal/notes`);

    try {
      // add note to database
      const noteRef = await addDoc(userRef, newNote);

      dispatch(activeNote(noteRef.id, newNote));
      dispatch(addNewNote(noteRef.id, newNote));
    } catch (error) {
      console.log(error);
    }
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!note.url) {
      delete note.url;
    }

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    await setDoc(doc(db, `${uid}/journal/notes`, note.id), noteToFirestore);

    dispatch(refreshNote(note.id, noteToFirestore));
    Swal.fire("Saved!", note.title, "success");
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdate,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});

export const startUploadingImage = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;

    Swal.fire({
      title: "Uploading...",
      text: "Wait :)",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const fileUrl = await fileUpload(file);
    activeNote.url = fileUrl;

    dispatch(startSaveNote(activeNote));

    Swal.close();
  };
};

export const startDeletingNote = (noteId) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    await deleteDoc(doc(db, `${uid}/journal/notes`, noteId));

    dispatch(deleteNote(noteId));

    Swal.fire("Deleted!", "Note deleted", "success");
  };
};

export const deleteNote = (noteId) => ({
  type: types.notesDelete,
  payload: noteId,
});

export const cleanNotes = () => ({
  type: types.notesLogoutClean,
});
