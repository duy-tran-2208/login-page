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

const LOGIN_SUCCESS_MESSAGE = 'Login succeeded.';
const REGISTER_SUCCESS_MESSAGE = 'Created succeeded!';
const CHANGE_PASS_SUCCESS_MESSAGE = 'Changed succeeded.';
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

      const { msg, token } = res.data;
      data = res.data;

      if (msg === LOGIN_SUCCESS_MESSAGE) {
        localStorage.setItem('token', token);
        localStorage.setItem('loginStatus', 'success');

        const tokenData = localStorage.getItem('token');

        const info = jwt.decode(tokenData);

        dispatch({
          type: LOGIN_SUCCESS,
          payload: info,
        });

        history.push('/profile');
      }
    } catch (error) {
      localStorage.setItem('loginStatus', 'FAIL');

      dispatch({
        type: LOGIN_FAIL,
        payload: error.toString(),
      });
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

      if (data.msg === REGISTER_SUCCESS_MESSAGE) {
        dispatch({ type: REGISTER_SUCCESS, payload: data });
      } else {
        dispatch({ type: REGISTER_FAIL, payload: data.msg });
      }
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.toString() });
      console.log(err);
    }
  };
};

const update = ({ mail, name, phone, avatar }) => {
  return async (dispatch) => {
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

      const info = res.data.data;
      dispatch({ type: UPDATE_SUCCESS, payload: info });
    } catch (err) {
      console.log(err);
      dispatch({ type: UPDATE_FAIL, payload: err.toString() });
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

      const { msg } = res.data;
      if (msg === CHANGE_PASS_SUCCESS_MESSAGE) {
        const info = res.data.data;
        dispatch({ type: CHANGE_PASS_SUCCESS, payload: info });
      } else {
        dispatch({ type: CHANGE_PASS_FAIL, payload: msg });
      }
    } catch (err) {
      dispatch({ type: CHANGE_PASS_FAIL, payload: err });
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

      const uploadRes = await dispatch(update({ avatar: avatarLink }));
      dispatch({ type: UPLOAD_SUCCESS });
    } catch (err) {
      dispatch({ type: UPLOAD_FAIL, payload: err.toString() });
    }
  };
};

export { login, register, update, changePassword, uploadFile };
