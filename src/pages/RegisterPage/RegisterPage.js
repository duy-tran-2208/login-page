import React, { useState, useEffect } from 'react';

import './Register.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/userAction';

import AccountLayout from '../../layout/AccountLayout/AccountLayout';
import axios from 'axios';

const inputElements = [
  {
    label: 'Email',
    placeholder: 'Enter your mail',
    icon: 'letter',
    fieldName: 'mail',
    id: 'email',
  },
  {
    label: 'Password',
    placeholder: 'Enter your password',
    icon: 'key',
    fieldName: 'password',
    id: 'current-pass',
  },
  {
    label: 'Confirm Password',
    placeholder: 'Enter your password',
    icon: 'key',
    fieldName: 'confirm',
    id: 'confirm-pass',
  },
  {
    label: 'Full Name',
    placeholder: 'Enter your name',
    icon: 'letter',
    fieldName: 'name',
    id: 'full-name',
  },
  {
    label: 'Phone number',
    placeholder: 'Enter your phone number',
    icon: 'letter',
    fieldName: 'phone',
    id: 'phone',
  },
];

const RegisterPage = (props) => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const { register = () => {} } = props; // register Action

  const { loading = false, error = '' } = props; // states from Redux Store

  const onChange = (value, state) => {
    if (state === 'mail') {
      setMail(value);
    }

    if (state === 'password') {
      setPassword(value);
    }

    if (state === 'confirm') {
      setConfirm(value);
    }

    if (state === 'name') {
      setName(value);
    }

    if (state === 'phone') {
      setPhone(value);
    }
  };

  useEffect(() => {
    // Set browser history
    localStorage.setItem('history', 'register');
  }, []);

  return (
    <div className='register-page-container'>
      <AccountLayout
        header='register'
        inputElements={inputElements}
        hasRemember={false}
        onChange={onChange}
        mail={mail}
        password={password}
        confirm={confirm}
        name={name}
        phone={phone}
        register={register}
        loading={loading}
        error={error}
      />
    </div>
  );
};

const mapStateToProp = (state) => ({
  // user: state.user,
  loading: state.user.loading.register,
  error: state.user.error.register,
});

RegisterPage.propTypes = {
  register: PropTypes.func.isRequired,
  // user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

export default connect(mapStateToProp, { register })(RegisterPage);

// export default RegisterPage;
