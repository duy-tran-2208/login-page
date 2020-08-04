import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/userAction';
import decode from '../../util/decode';

import './LoginPage.css';

import AccountLayout from '../../layout/AccountLayout/AccountLayout';

const inputElements = [
  {
    label: 'Email',
    placeholder: 'Enter your mail',
    icon: 'key',
    fieldName: 'mail',
    id: 'email',
  },
  {
    label: 'Password',
    placeholder: 'Enter your password',
    icon: 'letter',
    fieldName: 'password',
    id: 'current-pass',
  },
];

const LoginPage = (props) => {
  const { login } = props; // login Action
  const { loading, error } = props; // states from Redux Store

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    localStorage.removeItem('token');

    // Check if user have just register a new account
    if (localStorage.getItem('history') === 'register') {
      const registerMail = localStorage.getItem('registerMail');
      const registerPass = decode(localStorage.getItem('registerPass'));

      if (registerMail && registerPass) {
        // Fill in mail and password field of Login Page
        setMail(registerMail);
        setPassword(registerPass);
      }
    }
  }, []);

  useEffect(() => {
    const isRememberValue = localStorage.getItem('isRemembered');

    if (isRememberValue) {
      const isRemember = isRememberValue === 'true' ? true : false;

      if (isRemember) {
        const mailData = localStorage.getItem('rememberMail');
        const passData = decode(localStorage.getItem('rememberPass'));

        setMail(mailData);
        setPassword(passData);
      }
    }
  }, []);

  // Redirect user to Profile page with filled mail and password input

  const onChange = (value, fieldName) => {
    if (fieldName === 'mail') {
      setMail(value);
    }
    if (fieldName === 'password') {
      setPassword(value);
    }
  };

  return (
    <div className='login-page-container'>
      <AccountLayout
        header='login'
        inputElements={inputElements}
        hasRemember={true}
        onChange={onChange}
        mail={mail}
        password={password}
        login={login}
        loading={loading}
        error={error}
      />
    </div>
  );
};

const mapStateToProp = (state) => ({
  loading: state.user.loading.login,
  error: state.user.error.login,
});

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

export default connect(mapStateToProp, { login })(LoginPage);
