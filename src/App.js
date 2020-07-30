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

const checkAuth = () => {
  // console.log("CHECK AUTH");
  const status = localStorage.getItem('loginStatus');
  // console.log(status);

  if (!status) {
    console.log('FAIL');
    return false;
  }

  if (status === 'success') {
    console.log('SUCCESS');
    // <Redirect to={{ pathname: "/profile" }} />;
    return true;
  }

  return false;
  // return true;
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
              path='/login'
              component={() => <LoginPage checkAuth={checkAuth} />}
            />
            <Route path='/register' component={RegisterPage} />
            <AuthRoute exact path='/profile' component={ProfilePage} />
            {/* <Route path="/profile" component={ProfilePage} /> */}
            <Route path='/' component={LoginPage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
