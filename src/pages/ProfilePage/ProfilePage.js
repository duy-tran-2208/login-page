import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './ProfilePage.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { update, changePassword, uploadFile } from '../../actions/userAction';

import {
  validName,
  validPassword,
  validPhone,
  validConfirm,
  validMail,
} from '../../util/validation';

import jwt from 'jsonwebtoken';

import spinner from '../../images/spinner.gif';
import ProfileInput from '../../components/ProfileInput/ProfileInput';

const PencilSvg = (props) => {
  const { onClick } = props;

  return (
    <svg
      width='33px'
      height='33px'
      viewBox='0 0 33 33'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      xlink='http://www.w3.org/1999/xlink'
      id='pencil-svg'
      onClick={onClick}
    >
      <title>Group 4</title>
      <desc>Created with Sketch.</desc>
      <g
        id='Login'
        stroke='none'
        strokeWidth='1'
        fill='none'
        fillRule='evenodd'
      >
        <g id='Profile' transform='translate(-266.000000, -196.000000)'>
          <g id='Group-2' transform='translate(136.000000, 45.000000)'>
            <g id='Group-4' transform='translate(130.000000, 151.000000)'>
              <circle
                id='Oval1'
                className='glow'
                fill='#fff'
                opacity='0.187360491'
                cx='16.5'
                cy='16.5'
                r='16.5'
              ></circle>
              <g id='Group' transform='translate(4.000000, 4.000000)'>
                <circle
                  id='Oval2'
                  fill='#BD10E0'
                  cx='12.5'
                  cy='12.5'
                  r='12.5'
                ></circle>
                <path
                  d='M17.8967209,6.58409055 C17.1178643,5.80530315 15.8551438,5.80530315 15.0762872,6.58409055 L7.16965535,14.4900207 C7.11546952,14.5442017 7.07634489,14.6113655 7.05591702,14.685107 L6.01617211,18.4384851 C5.97341202,18.5923731 6.01686453,18.7571665 6.12973732,18.8702023 C6.24278317,18.9830651 6.40759123,19.0265138 6.56149286,18.9839306 L10.3152041,17.9441048 C10.3889522,17.9236787 10.4561219,17.8845576 10.5103077,17.8303766 L18.4167664,9.92427333 C19.1944112,9.14496661 19.1944112,7.88339675 18.4167664,7.10408998 L17.8967209,6.58409055 Z M8.13530593,14.778063 L14.6062726,8.30749746 L16.6932066,10.3942462 L10.2220667,16.8648117 L8.13530593,14.778063 Z M7.7184385,15.6144935 L9.38573513,17.2818153 L7.07946103,17.920736 L7.7184385,15.6144935 Z M17.7900804,9.29764286 L17.3200658,9.76761572 L15.2329588,7.68069389 L15.7031464,7.21072103 C16.1357676,6.77813826 16.8372405,6.77813826 17.2698617,7.21072103 L17.7900804,7.73072046 C18.222009,8.16382254 18.222009,8.86471391 17.7900804,9.29764286 L17.7900804,9.29764286 Z'
                  id='Shape'
                  fill='#FFFFFF'
                  fillRule='nonzero'
                ></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

const ProfilePage = (props) => {
  const { user } = props;
  const { loading, error } = props;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [avatar, setAvatar] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);

  const { update, changePassword, uploadFile } = props; // Actions

  const [inputValid, setInputValid] = useState(true);

  let token = localStorage.getItem('token');

  let uploadInput = null;
  let overlayRef = null;

  const setInputFieldVaid = (isValid) => {
    setInputValid(isValid);
  };

  const validSubmit = () => {
    const validateName = validName(fullName);
    const validateMail = validMail(mail);
    const validatePhone = validPhone(phone);

    if (validateName && validateMail && validatePhone) {
      if (pass === '' && newPass === '' && confirmPass === '') {
        // If user doesn't choose to change password
        return true;
      }
      return (
        validPassword(pass) &&
        validPassword(newPass) &&
        validConfirm(newPass, confirmPass)
      );
    }
    return false;
  };

  const save = async () => {
    if (!newPass && !pass) {
      await update({ mail, name: fullName, phone });
    } else {
      await Promise.all([
        update({ mail, name: fullName, phone }),
        changePassword({
          password: newPass,
          currentPassword: pass,
        }),
      ]);
    }
  };

  const fileSelectedHandler = async (e) => {
    const selectedImg = e.target.files[0];
    if (!selectedImg) {
      return;
    }
    await setSelectedFile(selectedImg);
  };

  const fileUploadHandler = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile, selectedFile.name);
    // console.log(...formData);
    await uploadFile({ formData });
  };

  useEffect(() => {
    const displaySpinner = () => {
      if (
        (loading.update || loading.changePassword || loading.uploadFile) &&
        overlayRef
      ) {
        overlayRef.classList.add('show');
      } else {
        overlayRef.classList.remove('show');
      }
    };

    displaySpinner();
  }, [loading]);

  useEffect(() => {
    if (selectedFile) {
      fileUploadHandler();
    }
  }, [selectedFile]);

  useEffect(() => {
    // Check if user from redux store has data
    if (user.email) {
      const { name, email, phone, avatar } = user;
      setFullName(name);
      setMail(email);
      setPhone(phone);
      if (avatar) {
        setAvatar(avatar);
      }
    }
    // Redux store has empty data when refreshing the page
    else {
      const localData = jwt.decode(token);

      if (localData) {
        const { email, name, phone, avatar } = localData;
        setFullName(name);
        setMail(email);
        setPhone(phone);
        if (avatar) {
          setAvatar(avatar);
        }
      }
    }
  }, [user]);

  return (
    <div className='profile-page-container'>
      <div className='header-container'>
        <h1 className='header'>my profile</h1>

        <p className='desc'>Manage your profile and contact infomation</p>
      </div>

      <main>
        <div className='top'>
          <div className='avatar'>
            <img src={avatar} />
            <PencilSvg onClick={() => uploadInput.click()} />
          </div>

          <div className='error-message upload-image'>
            <p>{error.uploadFile}</p>
          </div>

          <span className='name'>{fullName}</span>
        </div>

        <div className='content'>
          <input
            id='upload-input'
            style={{ display: 'none' }}
            ref={(input) => {
              uploadInput = input;
            }}
            type='file'
            accept='image/*'
            onChange={(e) => fileSelectedHandler(e)}
          />

          <form className='form first-form'>
            <ProfileInput
              label='Full name'
              name='fullName'
              placeholder='Full name'
              id='full-name'
              type='text'
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              setInputFieldVaid={setInputFieldVaid}
            />

            <ProfileInput
              label='Email'
              name='email'
              placeholder='Email'
              id='email'
              type='text'
              value={mail}
              onChange={(e) => {
                setMail(e.target.value);
              }}
              setInputFieldVaid={setInputFieldVaid}
            />

            <ProfileInput
              label='Phone'
              name='phone'
              placeholder='Phone'
              id='phone'
              type='text'
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              setInputFieldVaid={setInputFieldVaid}
            />

            <div className='error-message update'>
              <p>{error.update}</p>
            </div>
          </form>

          <div className='divide'></div>

          <span className='change-pass'>Change password</span>

          <form className='form second-form'>
            <ProfileInput
              label='Current password'
              name='currentPass'
              placeholder=''
              id='current-pass'
              eyeIcon={true}
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
              setInputFieldVaid={setInputFieldVaid}
            />

            <ProfileInput
              label='New password'
              name='newPass'
              placeholder=''
              id='new-pass'
              eyeIcon={true}
              value={newPass}
              onChange={(e) => {
                setNewPass(e.target.value);
              }}
              setInputFieldVaid={setInputFieldVaid}
            />

            <ProfileInput
              label='Confirm password'
              name='confirmPass'
              placeholder=''
              id='confirm-pass'
              eyeIcon={true}
              newPass={newPass}
              value={confirmPass}
              onChange={(e) => {
                setConfirmPass(e.target.value);
              }}
              setInputFieldVaid={setInputFieldVaid}
            />

            <div className='error-message change-password'>
              <p>{error.changePassword}</p>
            </div>
          </form>
        </div>

        <div className='btn-container'>
          <button
            type='button'
            className='button btn btn-primary btn-save'
            onClick={() => {
              const isValid = validSubmit();
              if (isValid) {
                save();
              }
            }}
          >
            Save
          </button>

          <Link to='/login'>
            <button type='button' className='button btn btn-primary btn-logout'>
              Log out
            </button>
          </Link>
        </div>
      </main>

      <div
        className='overlay'
        ref={(ref) => {
          overlayRef = ref;
        }}
      >
        <img src={spinner} />
      </div>
    </div>
  );
};

const mapStateToProp = (state) => ({
  user: state.user.info,
  loading: state.user.loading,
  error: state.user.error,
});

ProfilePage.propTypes = {
  update: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};

export default connect(mapStateToProp, { update, changePassword, uploadFile })(
  ProfilePage
);
