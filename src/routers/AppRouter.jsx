import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import { JournalPage } from '../components/journal/JournalPage';

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/auth" component={AuthRouter} />
          <Route exact path="/" component={JournalPage} />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
