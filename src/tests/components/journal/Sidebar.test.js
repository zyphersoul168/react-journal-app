import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";

import { Sidebar } from "../../../components/journal/Sidebar";
import { startLogout } from "../../../actions/auth";
import { startNewNote } from "../../../actions/notes";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  auth: {
    name: "aaron",
  },
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: {
      id: "abc",
    },
    notes: [],
  },
};
let store = mockStore(initialState);
store.dispatch = jest.fn();

jest.mock("../../../actions/auth", () => ({
  startLogout: jest.fn(),
}));

jest.mock("../../../actions/notes", () => ({
  startNewNote: jest.fn(),
}));

const wrapper = mount(
  <Provider store={store}>
    <Sidebar />
  </Provider>
);

describe("Tests on Sidebar component", () => {
  test("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should call logout action", () => {
    wrapper.find(".logout").simulate("click");

    expect(startLogout).toHaveBeenCalled();
  });

  test("should call startNewNote action", () => {
    wrapper.find(".journal__new-entry").simulate("click");

    expect(startNewNote).toHaveBeenCalled();
  });
});
