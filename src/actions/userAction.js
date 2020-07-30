import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_LOADING,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  UPDATE_LOADING,
  CHANGE_PASS_LOADING,
  CHANGE_PASS_FAIL,
  CHANGE_PASS_SUCCESS,
  UPLOAD_SUCCESS,
  UPLOAD_FAIL,
  UPLOAD_LOADING,
} from './types';

import jwt from 'jsonwebtoken';
import axios from 'axios';

const LOGIN_FAIL_MESSAGE = 'Password is incorrect';
const LOGIN_SUCCESS_MESSAGE = 'Login succeeded.';
const REGISTER_FAIL_MESSAGE = 'Email already in use.';
const CHANGE_PASS_FAIL_MESSAGE = 'Password not match.';
const HOST = 'http://api.terralogic.ngrok.io/';

const login = ({ mail, password, history }) => {
  let data = '';
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN_LOADING });

      const bodyInfo = {
        email: mail,
        password,
      };

      const res = await axios.post(
        'http://api.terralogic.ngrok.io/api/login',
        bodyInfo
      );

      console.log(res.data);
      const { msg, token } = res.data;
      data = res.data;

      if (msg === LOGIN_FAIL_MESSAGE) {
        dispatch({
          type: LOGIN_FAIL,
          payload: msg,
        });
        return;
      }

      if (msg === LOGIN_SUCCESS_MESSAGE) {
        localStorage.setItem('token', token);
        // localStorage.setItem('loginStatus', 'success');

        const tokenData = localStorage.getItem('token');

        const info = jwt.decode(tokenData);
        console.log(info);

        dispatch({
          type: LOGIN_SUCCESS,
          payload: info,
        });

        console.log(history);
        history.push('/profile');
        console.log(history);
      }
    } catch (error) {
      // localStorage.setItem('loginStatus', 'failed');
      console.log(data);
      console.log(error);

      dispatch({
        type: LOGIN_FAIL,
        payload: error,
      });
      // history.push('/login');
    }
  };
};

const register = ({ mail, password, name, phone }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REGISTER_LOADING });

      const info = {
        email: mail,
        password,
        name,
        phone,
      };

      const res = await axios.post(
        'http://api.terralogic.ngrok.io/api/register',
        info
      );

      const { data } = res; // {email, name, phone, id}

      if (data.msg === REGISTER_FAIL_MESSAGE) {
        dispatch({ type: REGISTER_FAIL, payload: data.msg });
      } else {
        dispatch({ type: REGISTER_SUCCESS, payload: data });
      }

      console.log(data);

      //   localStorage.setItem('registerStatus', 'success');
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err });
      //   localStorage.setItem('registerStatus', 'failed');
      console.log(err);
    }
  };
};

const update = ({ mail, name, phone, avatar }) => {
  return async (dispatch) => {
    console.log('UPDATE()');
    const bodyInfo = {
      email: mail,
      name,
      phone,
      avatar,
    };

    const token = localStorage.getItem('token');

    try {
      dispatch({ type: UPDATE_LOADING });

      const res = await axios.patch(
        'http://api.terralogic.ngrok.io/api/update',
        bodyInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('UPDATE SUCCESS');
      const info = res.data.data;
      console.log(res.data);
      dispatch({ type: UPDATE_SUCCESS, payload: info });
    } catch (err) {
      console.log('UPDATE FAIL');
      console.log(err);
      dispatch({ type: UPDATE_FAIL, payload: err });
    }
  };
};

const changePassword = ({ password, currentPassword }) => {
  return async (dispatch) => {
    const bodyInfo = {
      password,
      currentPassword,
    };

    const token = localStorage.getItem('token');

    try {
      dispatch({ type: CHANGE_PASS_LOADING });

      const res = await axios.post(
        'http://api.terralogic.ngrok.io/api/changePassword',
        bodyInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);
      const { msg } = res.data;
      if (msg === CHANGE_PASS_FAIL_MESSAGE) {
        dispatch({ type: CHANGE_PASS_FAIL, payload: msg });
        console.log('CHANGE PASS FAILED');
      } else {
        const info = res.data.data;
        dispatch({ type: CHANGE_PASS_SUCCESS, payload: info });
        console.log('CHANGE PASS SUCCESS');
      }
    } catch (err) {
      dispatch({ type: CHANGE_PASS_FAIL, payload: err });
      console.log('CHANGE PASS FAIL');
      console.log(err);
    }
  };
};

const uploadFile = ({ formData }) => {
  return async (dispatch) => {
    const bodyInfo = formData;

    const token = localStorage.getItem('token');

    try {
      dispatch({ type: UPLOAD_LOADING });

      const res = await axios.post(
        'http://api.terralogic.ngrok.io/api/upload',
        bodyInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const imgToken = res.data.data;
      const avatarLink = HOST + imgToken;
      console.log(res.data);

      const uploadRes = await dispatch(update({ avatar: avatarLink }));
      console.log('UPLOAD SUCCESS');
      console.log(uploadRes);
      // console.log(uploadRes.data);
      // const info = uploadRes.data.data;
      dispatch({ type: UPLOAD_SUCCESS });
    } catch (err) {
      console.log('UPLOAD FAIL');
      console.log(err);
      dispatch({ type: UPLOAD_FAIL, payload: err });
    }
  };
};

export { login, register, update, changePassword, uploadFile };
