import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { login } from "../../actions/auth";
import { AppRouter } from "../../routers/AppRouter";
import { act } from "@testing-library/react";

jest.mock("../../actions/auth", () => ({
  login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: {
      id: "abc",
    },
    notes: [],
  }
};
let store = mockStore(initialState);
store.dispatch = jest.fn();

describe("Tests on AppRouter component", () => {
  test("should login if user is authenticated", async () => {
    let user;

    await act(async () => {
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        "test@testing.com",
        "123456"
      );

      user = userCredentials.user;

      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });

    expect(login).toHaveBeenCalledWith("Q4kcOIK48hVqWtQFQUHIlZIDgvk1", null);
  });
});
