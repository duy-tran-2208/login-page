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
  const { login } = props; // login Action
  const { loading, error } = props; // states from Redux Store

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const { checkAuth } = props;

  useEffect(() => {
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
