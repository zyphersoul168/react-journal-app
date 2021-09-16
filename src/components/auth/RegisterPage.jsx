import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: 'aaron',
    email: 'ortiz@mail.com',
    password: '1234',
    password2: '1234',
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (event) => {
    event.preventDefault();
    isFormValid() && dispatch(startRegisterWithEmailPasswordName(email, password, name))
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError('Name is required'));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError('Not valid email'));
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(setError('Password too short'));
      return false;
    }

    dispatch(removeError());
    return true;
  };

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleRegister}>
        {msgError && <div className="auth__alert">{msgError}</div>}
        <input
          className="auth__input"
          type="text"
          placeholder="Name"
          name="name"
          autoComplete="on"
          onChange={handleInputChange}
          value={name}
        />
        <input
          className="auth__input"
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          onChange={handleInputChange}
          value={email}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
          value={password}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Confirm password"
          name="password2"
          autoComplete="off"
          onChange={handleInputChange}
          value={password2}
        />
        <button className="auth__button">
          <span className="auth__login">Sign up</span>
        </button>
        <hr />
        <div>
          <span>Or you can sign up with:</span>
          <div className="google-btn">
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Continue with google</b>
            </p>
          </div>
        </div>
        <span>
          Already have an account?{' '}
          <Link className="link" to="/auth/login">
            Log in
          </Link>
        </span>
      </form>
    </div>
  );
};
