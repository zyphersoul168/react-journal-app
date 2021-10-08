import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";

import { LoginPage } from "../../../components/auth/LoginPage";
import {
  startGoogleLogin,
  startLoginEmailPassword,
} from "../../../actions/auth";

jest.mock("../../../actions/auth", () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn(),
}));

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
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  </Provider>
);

describe("Tests on LoginPage component", () => {
  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  });

  test("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should dispatch startGoogleLogin action", () => {
    wrapper.find(".google-btn").prop("onClick")();

    expect(startGoogleLogin).toHaveBeenCalled();
  });

  test("should dispatch startLoginEmailPassword action", () => {
    wrapper.find("form").prop("onSubmit")({ preventDefault() {} });

    expect(startLoginEmailPassword).toHaveBeenCalledWith(
      "ortiz@mail.com",
      "aaroneduardo1"
    );
  });
});
