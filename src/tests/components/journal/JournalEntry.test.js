import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { JournalEntry } from "../../../components/journal/JournalEntry";
import { activeNote } from "../../../actions/notes";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
let store = mockStore(initialState);
store.dispatch = jest.fn();

const note = {
  id: "abc",
  date: 0,
  title: "Hola",
  body: "Mundo",
  url: "https://piolamano.com/photo.png",
};

const wrapper = mount(
  <Provider store={store}>
    <JournalEntry {...note} />
  </Provider>
);

describe("Tests on JournalEntry component", () => {
  test("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should dispatch activeNote action", () => {
    wrapper.find(".journal__entry").simulate("click");

    expect(store.dispatch).toHaveBeenCalledWith(
      activeNote(note.id, { ...note })
    );
  });
});
