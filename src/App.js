import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import './App.css';

import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const checkAuth = () => {
  const status = localStorage.getItem('loginStatus');

  if (!status) {
    console.log('FAIL');
    return false;
  }

  if (status === 'success') {
    console.log('SUCCESS');
    return true;
  }

  return false;
};

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
    }
  />
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Switch>
            <Route
              exact
              path='/login'
              component={() => <LoginPage checkAuth={checkAuth} />}
            />
            <Route exact path='/register' component={RegisterPage} />
            <AuthRoute exact path='/profile' component={ProfilePage} />
            {/* <Route path="/profile" component={ProfilePage} /> */}
            <Route path='/' component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
