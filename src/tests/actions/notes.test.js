/**
 * @jest-environment node
 */

import { deleteDoc, doc, getDoc } from "firebase/firestore";
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";

import {
  startLoadingNotes,
  startNewNote,
  startSaveNote,
  startUploadingImage,
} from "../../actions/notes";
import { db } from "../../firebase/config";
import { types } from "../../types/types";

jest.mock("../../helpers/fileUpload", () => ({
  fileUpload: () => {
    return Promise.resolve("https://misfotos.com/photo.png");
  },
}));

global.scrollTo = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  auth: {
    uid: "TESTING",
  },
  notes: {
    active: {
      id: "5CnuIGgViKbNGjFf88DS",
      title: "titulo",
      body: "body",
      date: new Date().getTime(),
    },
  },
};
let store = mockStore(initialState);
const payloadTesting = {
  id: expect.any(String),
  title: "",
  body: "",
  date: expect.any(Number),
};

describe("tests on notes actions", () => {
  beforeEach(() => {
    // restart store
    store = mockStore(initialState);
  });

  test("should create a new note with startNewNote", async () => {
    await store.dispatch(startNewNote());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: payloadTesting,
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: payloadTesting,
    });

    const { id: action1Id } = actions[0].payload;
    const { id: action2Id } = actions[1].payload;

    // delete notes that actions adds
    await deleteDoc(doc(db, "TESTING/journal/notes", action1Id));
    await deleteDoc(doc(db, "TESTING/journal/notes", action2Id));

    jest.setTimeout(8000);
  });

  test("should load notes with startLoadingNotes", async () => {
    await store.dispatch(startLoadingNotes("TESTING"));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    });

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };

    // console.log(actions[0].payload[0])
    expect(actions[0].payload[0]).toMatchObject(expected);
  });

  test("should update note with startSaveNote", async () => {
    const note = {
      id: "5CnuIGgViKbNGjFf88DS",
      title: "titulo",
      body: "body",
      date: new Date().getTime(),
    };

    await store.dispatch(startSaveNote(note));

    const actions = store.getActions();

    expect(actions[0].type).toBe(types.notesUpdate);

    const docRef = doc(db, "TESTING/journal/notes", note.id);
    const docSnap = await getDoc(docRef);

    expect(docSnap.data().title).toBe(note.title);
  });

  test("should update image url with startUploadingImage;", async () => {
    const file = [];

    await store.dispatch(startUploadingImage(file));

    const docRef = doc(db, "TESTING/journal/notes", "5CnuIGgViKbNGjFf88DS");
    const docSnap = await getDoc(docRef);

    expect(docSnap.data().url).toBe("https://misfotos.com/photo.png");
  });
});
