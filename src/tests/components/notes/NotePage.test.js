import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";

import { NotePage } from "../../../components/notes/NotePage";
import { activeNote } from "../../../actions/notes";

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
      title: "hola",
      body: "mundo",
      date: 0,
    },
    notes: [],
  },
};
let store = mockStore(initialState);
store.dispatch = jest.fn();

jest.mock("../../../actions/notes", () => ({
  activeNote: jest.fn(),
}));

const wrapper = mount(
  <Provider store={store}>
    <NotePage />
  </Provider>
);

describe('Tests on NotePage component', () => {
  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  test('should dispatch activeNote', () => {
    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "hola de nuevo",
      },
    });

    expect(activeNote).toHaveBeenLastCalledWith(
      "abc",
      {
        id: "abc",
        title: "hola de nuevo",
        body: "mundo",
        date: 0,
      }
    );
  })
  
})
