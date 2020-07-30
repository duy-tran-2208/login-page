import React, { useState, useEffect, useRef } from 'react';

import './Input.css';

import {
  validName,
  validMail,
  validConfirm,
  validPassword,
  validPhone,
} from '../../util/validation';

import keyIcon from '../../images/Suche02.svg';
import letterIcon from '../../images/Suche.svg';

const EyeIcon = () => {
  return (
    <svg
      width='18px'
      height='12px'
      viewBox='0 0 18 12'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      xlink='http://www.w3.org/1999/xlink'
    >
      <title>Suche</title>
      <desc>Created with Sketch.</desc>
      <defs>
        <path
          d='M9,0.375 C5.25,0.375 2.0475,2.7075 0.75,6 C2.0475,9.2925 5.25,11.625 9,11.625 C12.75,11.625 15.9525,9.2925 17.25,6 C15.9525,2.7075 12.75,0.375 9,0.375 Z M9,9.75 C6.93,9.75 5.25,8.07 5.25,6 C5.25,3.93 6.93,2.25 9,2.25 C11.07,2.25 12.75,3.93 12.75,6 C12.75,8.07 11.07,9.75 9,9.75 Z M9,3.75 C7.755,3.75 6.75,4.755 6.75,6 C6.75,7.245 7.755,8.25 9,8.25 C10.245,8.25 11.25,7.245 11.25,6 C11.25,4.755 10.245,3.75 9,3.75 Z'
          id='path-1'
        ></path>
      </defs>
      <g id='Eye' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
        <g transform='translate(-504.000000, -488.000000)' id='Suche'>
          <g transform='translate(504.000000, 488.000000)'>
            <mask id='mask-2' fill='white'>
              <use href='#path-1'></use>
            </mask>
            <use id='Eye' href='#path-1'></use>
          </g>
        </g>
      </g>
    </svg>
  );
};

const LetterSvg = () => (
  <svg
    width='20px'
    height='16px'
    viewBox='0 0 20 16'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    xlink='http://www.w3.org/1999/xlink'
  >
    <title>Suche</title>
    <desc>Created with Sketch.</desc>
    <g id='Login' stroke='none' strokeWidth='1' fillRule='evenodd'>
      <g transform='translate(-197.000000, -399.000000)' id='Suche'>
        <g transform='translate(197.000000, 399.000000)'>
          <path
            d='M2,0 L18,0 C19.1046,0 20,0.8954 20,2 L20,14.00003 C20,15.10453 19.1046,16.00003 18,16.00003 L2,16.00003 C0.89543,16.00003 0,15.10453 0,14.00003 L0,2 C0,0.8954 0.89543,0 2,0 Z M10,7.00003 L18,2 L2,2 L10,7.00003 Z M2,14.00003 L18,14.00003 L18,4.37 L10,9.35863 L2,4.37 L2,14.00003 Z'
            id='Shape'
          ></path>
        </g>
      </g>
    </g>
  </svg>
);

const KeySvg = () => (
  <svg
    width='22px'
    height='12px'
    viewBox='0 0 22 12'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    xlink='http://www.w3.org/1999/xlink'
  >
    <title>Suche</title>
    <desc>Created with Sketch.</desc>
    <defs>
      <path
        d='M11.6491154,5.00103707 C10.6991154,2.31103707 7.8991154,0.50103707 4.7691154,1.12103707 C2.4791154,1.58103707 0.6191154,3.41103707 0.1391154,5.70103707 C-0.6808846,9.57103707 2.2591154,13.0010371 5.9991154,13.0010371 C8.6091154,13.0010371 10.8291154,11.3310371 11.6491154,9.00103707 L15.9991154,9.00103707 L15.9991154,11.0010371 C15.9991154,12.1010371 16.8991154,13.0010371 17.9991154,13.0010371 C19.0991154,13.0010371 19.9991154,12.1010371 19.9991154,11.0010371 L19.9991154,9.00103707 C21.0991154,9.00103707 21.9991154,8.10103707 21.9991154,7.00103707 C21.9991154,5.90103707 21.0991154,5.00103707 19.9991154,5.00103707 L11.6491154,5.00103707 Z M5.9991154,9.00103707 C4.8991154,9.00103707 3.9991154,8.10103707 3.9991154,7.00103707 C3.9991154,5.90103707 4.8991154,5.00103707 5.9991154,5.00103707 C7.0991154,5.00103707 7.9991154,5.90103707 7.9991154,7.00103707 C7.9991154,8.10103707 7.0991154,9.00103707 5.9991154,9.00103707 Z'
        id='path-1'
      ></path>
    </defs>
    <g id='Login' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
      <g transform='translate(-196.000000, -488.000000)' id='Suche'>
        <g transform='translate(196.000000, 487.000000)'>
          <mask id='mask-2'>
            <use href='#path-1'></use>
          </mask>
          <use id='Key' href='#path-1'></use>
        </g>
      </g>
    </g>
  </svg>
);

const RED = 'rgb(231, 0, 0)';

const Input = (props) => {
  const { label, icon, placeholder, fieldName, onChange, id } = props;
  const { mail, password, confirm, name, phone } = props;

  const [reveal, setReveal] = useState(false); // reveal password
  const [error, setError] = useState('');

  let errorRef = null;
  let lineRef = null;
  let inputRef = null;

  const changeStatus = (id) => {
    let value = inputRef.value;
    let len = inputRef.value.length;

    let isValid = false;
    let errMessage = '';

    switch (id) {
      case 'full-name': {
        isValid = validName(value);
        errMessage = 'Name is invalid';
        break;
      }

      case 'email': {
        isValid = validMail(value);
        errMessage = 'Email is invalid';
        break;
      }

      case 'phone': {
        isValid = validPhone(value);
        errMessage = 'Phone is invalid';
        break;
      }

      case 'current-pass': {
        isValid = validPassword(value);
        errMessage = 'Password is invalid';
        break;
      }

      case 'new-pass': {
        isValid = validPassword(value);
        errMessage = 'New password is invalid';
        break;
      }

      case 'confirm-pass': {
        isValid = validConfirm(password, value);
        errMessage = 'Confirm password is not match.';
        break;
      }

      default: {
      }
    }

    if (isValid) {
      lineRef.style = `width: ${len * 7.3}px; background: green`;
      errorRef.classList.remove('display');
      errorRef.classList.remove('show');
      // setInputFieldVaid(true);
    } else {
      errorRef.classList.add('display');
      lineRef.style = `width: ${len * 7.3}px; background: ${RED}`;
      setError(errMessage);
      // setInputFieldVaid(false);
    }
  };

  useEffect(() => {}, []);

  const getValue = (fieldName) => {
    if (fieldName === 'mail') {
      return mail;
    }
    if (fieldName === 'password') {
      return password;
    }
    if (fieldName === 'confirm') {
      return confirm;
    }
    if (fieldName === 'name') {
      return name;
    }
    if (fieldName === 'phone') {
      return phone;
    }
  };

  return (
    <div className='input-wrapper'>
      <label htmlFor='email'>{label}</label>

      {fieldName === 'password' || fieldName === 'confirm' ? (
        <input
          className='form-control input'
          type={reveal ? 'text' : 'password'}
          name={fieldName}
          placeholder={placeholder}
          value={getValue(fieldName)}
          onChange={(e) => {
            onChange(e.target.value, fieldName);
            changeStatus(id);
          }}
          ref={(ref) => {
            inputRef = ref;
          }}
          id={`input-${fieldName}`}
        />
      ) : (
        <input
          className='form-control input'
          type='text'
          name={fieldName}
          placeholder={placeholder}
          value={getValue(fieldName)}
          onChange={(e) => {
            onChange(e.target.value, fieldName);
            changeStatus(id);
          }}
          ref={(ref) => {
            inputRef = ref;
          }}
          id={`input-${fieldName}`}
        />
      )}

      <div
        // id={`icon-${fieldName}`}
        className='icon'
      >
        {fieldName === 'password' || fieldName === 'confirm' ? (
          <img src={keyIcon} />
        ) : (
          <img src={letterIcon} />
        )}
      </div>

      {(fieldName === 'password' || fieldName === 'confirm') && (
        <div
          className='reveal'
          onClick={() => {
            setReveal(!reveal);
          }}
        >
          <EyeIcon />
        </div>
      )}

      <div
        className='error-container'
        ref={(ref) => {
          errorRef = ref;
        }}
        onClick={() => {
          errorRef.classList.toggle('show');
        }}
      >
        {/* <p className='error-msg'>{`Name is asd as das sa dasfadfasd sainvalid`}</p> */}
        <p className='error-msg'>{error}</p>

        <div className='arrow-down'></div>

        <svg
          height='32'
          style={{ overflow: 'visible', enableBackground: 'new 0 0 32 32' }}
          viewBox='0 0 32 32'
          width='32'
          space='preserve'
          xmlns='http://www.w3.org/2000/svg'
          xlink='http://www.w3.org/1999/xlink'
          className='error'
          // onClick={() => displayMessage()}
        >
          <g>
            <g id='Error_1_'>
              <g id='Error'>
                <circle cx='16' cy='16' id='bg' r='16' />
                <path d='M14.5,25h3v-3h-3V25z M14.5,6v13h3V6H14.5z' id='sign' />
              </g>
            </g>
          </g>
        </svg>
      </div>

      <div
        className='line'
        ref={(ref) => {
          lineRef = ref;
        }}
      ></div>
    </div>
  );
};

export default Input;
