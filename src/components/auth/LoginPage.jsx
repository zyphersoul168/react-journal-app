import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    email: 'ortiz@mail.com',
    password: 'aaroneduardo1',
  });

  const { email, password } = formValues;

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(startLoginEmailPassword(email, password));
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <input
          className="auth__input"
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <button disabled={ loading } className="auth__button">
          <span className="auth__login">Log in</span>
        </button>
        <hr />
        <div>
          <span>Or you can log in with:</span>
          <div className="google-btn" onClick={handleGoogleLogin}>
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
          Don't have an account?{' '}
          <Link className="link" to="/auth/register">
            Sign up
          </Link>
        </span>
      </form>
    </div>
  );
};
