import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { googleAuthProvider } from '../firebase/config';
import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';
import Swal from 'sweetalert2';
import { errors } from '../types/errors';
import { cleanNotes } from './notes';

const auth = getAuth();

export const startLoginEmailPassword = (email, password) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(login(user.uid, user.displayName));
      dispatch(finishLoading());
    } catch (error) {
      dispatch(finishLoading());
      error.message === errors.userNotFound &&
        Swal.fire('Error', 'User not found', 'error');
      error.message === errors.wrongPassword &&
        Swal.fire('Error', 'Wrong Password', 'error');
    }
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(user, { displayName: name });
        dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => {
        error.message === errors.existingAccount &&
          Swal.fire('Error', 'There is already an account with this email', 'error');
        console.log(error.message);
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    signInWithPopup(auth, googleAuthProvider).then(({ user }) => {
      dispatch(login(user.uid, user.displayName));
    });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startLogout = () => {
  return async (dispatch) => {
    await signOut(auth);
    dispatch(logout());
    dispatch(cleanNotes());
  };
};

export const logout = () => ({
  type: types.logout,
});
