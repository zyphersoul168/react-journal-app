import { authReducer } from "../../components/reducers/authReducer";
import { types } from "../../types/types";

describe("Tests on authReducer", () => {
  test("should login", () => {
    const initialState = {};
    const action = {
      type: types.login,
      payload: {
        uid: "12345",
        displayName: "aaron",
      },
    };
    const state = authReducer(initialState, action);
    // console.log(state)
    expect(state).toEqual({
      uid: "12345",
      name: "aaron",
    });
  });

  test("should logout", () => {
    const initialState = {
      uid: "12345",
      name: "aaron",
    };
    const action = {
      type: types.logout,
    };
    const state = authReducer(initialState, action);

    expect(state).toEqual({});
  });

  test("should return default state", () => {
    const initialState = {
      uid: "12345",
      name: "aaron",
    };
    const action = {
      type: "idk",
    };
    const state = authReducer(initialState, action);

    expect(state).toEqual(initialState);
  });
});
