import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { JournalPage } from "../components/journal/JournalPage";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";
import { WaitPage } from "../components/auth/WaitPage";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
        dispatch(startLoadingNotes(user.uid))
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return <WaitPage />;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRouter
            isAuthenticated={isLoggedIn}
            path="/auth"
            component={AuthRouter}
          />
          <PrivateRouter
            isAuthenticated={isLoggedIn}
            exact
            path="/"
            component={JournalPage}
          />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
