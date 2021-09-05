import React from 'react';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  const handleClick = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input
          className="auth__input"
          type="text"
          placeholder="email"
          name="email"
        />
        <input
          className="auth__input"
          type="text"
          placeholder="password"
          name="password"
        />
        <button onClick={handleClick} className="auth__button">
          <span className="auth__login">Login</span>
        </button>
        <div>
          <span>Or you can login with:</span>
          <div className="social-btn">
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
          </div>
        </div>
        <hr />
        <p>Don't have an account?</p>
        <Link to="/auth/register">Create a new account</Link>
      </form>
    </div>
  );
};
