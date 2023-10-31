// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSession } from './sessionContext';
import { SessionProvider } from './sessionContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup2';
import Dashboard2 from './pages/Dashboard2';

function AppRouter() {
  const { session, login, logout } = useSession();
  return (
    <SessionProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/dashboard" exact component={Dashboard2} />
        </Switch>
      </Router>
    </SessionProvider>
  );
}

export default AppRouter;
