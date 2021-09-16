export const types = {
  // authReducer
  login: '[auth] login',
  logout: '[auth] logout',

  // uiReducer
  uiSetError: '[UI] Set Error',
  uiRemoveError: '[UI] Remove Error',
  uiStartLoading: '[UI] Start loading',
  uiFinishLoading: '[UI] Finish loading',

  // notes
  notesAddNew: '[notes] New note',
  notesActive: '[notes] Set active note',
  notesLoad: '[notes] Load notes',
  notesUpdate: '[notes] Update note',
  notesFileURL: '[notes] Update img url',
  notesDelete: '[notes] Delete note',
  notesLogoutClean: '[notes] Logout clean',
};
