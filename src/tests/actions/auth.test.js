import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";

import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
let store = mockStore(initialState);

describe("Tests on auth actions", () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  test("should login and logout", () => {
    const loginAction = login("12345", "aaron");
    const logoutAction = logout();

    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid: "12345",
        displayName: "aaron",
      },
    });

    expect(logoutAction).toEqual({
      type: types.logout,
    });
  });

  test("should logout with startLogout action", async () => {
    await store.dispatch(startLogout());
    const actions = store.getActions();

    expect(actions[0]).toEqual({ type: types.logout });
    expect(actions[1]).toEqual({ type: types.notesLogoutClean });
  });

  test('should login with email and password', async () => {
    await store.dispatch(startLoginEmailPassword("test@testing.com", "123456"));
    const actions = store.getActions();

    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: expect.any(String),
        displayName: null,
      }
    });
  })
  
});
