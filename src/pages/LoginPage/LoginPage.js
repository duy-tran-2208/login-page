import React, { useState, useEffect } from 'react';

import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/userAction';

import axios from 'axios';
import jwt from 'jsonwebtoken';

import './LoginPage.css';
import logo from '../../images/brand-logo.svg';
import letter from '../../images/Suche.svg';
import rightImg from '../../images/solution-experts.png';

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
    id: 'new-pass',
  },
];

const LoginPage = (props) => {
  const { login, loading } = props; // login Action

  // console.log(props.loading);

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const { checkAuth } = props;

  let loginSuccess = 'unknown';

  useEffect(() => {
    // setRemember();
    console.log('USE EFFECT');
    // localStorage.setItem('loginStatus', 'failed');
    localStorage.removeItem('token');
  }, []);

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
        loginSuccess={loginSuccess}
        loading={loading}
      />
    </div>
  );
};

const mapStateToProp = (state) => ({
  user: state.user,
  loading: state.user.loading.login,
});

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProp, { login })(LoginPage);
