import { types } from "../../types/types";

describe("Tests on types object", () => {
  test("should have these types", () => {
    expect(types).toEqual({
      login: "[auth] login",
      logout: "[auth] logout",

      uiSetError: "[UI] Set Error",
      uiRemoveError: "[UI] Remove Error",
      uiStartLoading: "[UI] Start loading",
      uiFinishLoading: "[UI] Finish loading",

      notesAddNew: "[notes] New note",
      notesActive: "[notes] Set active note",
      notesLoad: "[notes] Load notes",
      notesUpdate: "[notes] Update note",
      notesFileURL: "[notes] Update img url",
      notesDelete: "[notes] Delete note",
      notesLogoutClean: "[notes] Logout clean",
    });
  });
});
