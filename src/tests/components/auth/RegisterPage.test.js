import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";

import { RegisterPage } from "../../../components/auth/RegisterPage";
import { types } from "../../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
};
let store = mockStore(initialState);

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  </Provider>
);

describe("Tests on RegisterPage component", () => {
  test("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should dispatch RegisterEmailPassword action", () => {
    const emailField = wrapper.find('input[name="email"]');
    emailField.simulate("change", {
      target: {
        value: "",
        name: "email",
      },
    });

    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    const actions = store.getActions();
    
    expect(actions[0]).toEqual({
      type: types.uiSetError,
      payload: "Not valid email",
    });
  });

  test('should show alert message with error', () => {
    const initialState = {
      auth: {},
      ui: {
        loading: false,
        msgError: "Email no es correcto",
      },
    };
    const store = mockStore(initialState);
    
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </Provider>
    );
  
    expect(wrapper.find(".auth__alert").exists()).toBe(true);
    expect(wrapper.find(".auth__alert").text().trim()).toBe(initialState.ui.msgError);
  });
  
});
