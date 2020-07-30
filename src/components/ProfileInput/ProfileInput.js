import React, { useState, useEffect } from 'react';

import './ProfileInput.css';

import {
  validPassword,
  validMail,
  validName,
  validPhone,
  validConfirm,
} from '../../util/validation';

const EyeIcon = () => (
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
    <g id='Login' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
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

const ErrorSvg = (props) => {
  const { className, id } = props;
  const errorMsgEl = document.querySelector('.error-msg');

  const displayMessage = () => {
    errorMsgEl.classList.toggle('show');
  };

  return (
    <div className='error-container' key={id}>
      <p className='error-msg'>asdasdasdasdasd</p>

      <svg
        height='32'
        // style='overflow:visible;enable-background:new 0 0 32 32'
        style={{ overflow: 'visible', enableBackground: 'new 0 0 32 32' }}
        viewBox='0 0 32 32'
        width='32'
        space='preserve'
        xmlns='http://www.w3.org/2000/svg'
        xlink='http://www.w3.org/1999/xlink'
        className={className}
        onClick={() => displayMessage()}
      >
        <g>
          <g id='Error_1_'>
            <g id='Error'>
              <circle
                cx='16'
                cy='16'
                id='bg'
                r='16'
                // style={{ fill: '#D72828' }}
              />
              <path
                d='M14.5,25h3v-3h-3V25z M14.5,6v13h3V6H14.5z'
                id='sign'
                // style={{ fill: '#E6E6E6' }}
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

const RED = 'rgb(231, 0, 0)';

const ProfileInput = (props) => {
  const {
    id,
    label,
    name,
    placeholder,
    type,
    key,
    eyeIcon,
    value,
    onChange,
  } = props;

  const { setInputFieldVaid } = props;

  const [reveal, setReveal] = useState(true);

  const [error, setError] = useState('');

  let errorRef = null;
  let lineRef = null;
  let inputRef = null;
  let eyeRef = null;

  const changeStatus = (id) => {
    let value = inputRef.value;
    let len = inputRef.value.length;
    // console.log(errorRef);

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
        isValid = validConfirm(props.newPass, value);
        errMessage = 'Confirm password is not match.';
        break;
      }

      default: {
      }
    }

    if (isValid) {
      lineRef.style = `width: ${len * 9}px; background: green`;
      errorRef.classList.remove('display');
      errorRef.classList.remove('show');
      setInputFieldVaid(true);
    } else {
      errorRef.classList.add('display');
      lineRef.style = `width: ${len * 9}px; background: ${RED}`;
      setError(errMessage);
      setInputFieldVaid(false);
    }
  };

  useEffect(() => {
    if (eyeIcon) {
      setReveal(false);
    }
  }, []);

  // lineWidth =

  return (
    <div className='profile-input-container' id={id}>
      <label htmlFor='fullName'>{label}</label>

      <input
        className='form-control input'
        type={reveal ? 'text' : 'password'}
        name={name}
        placeholder={placeholder}
        value={value}
        ref={(ref) => {
          inputRef = ref;
        }}
        onChange={(e) => {
          onChange(e);
          changeStatus(id);
        }}
      />

      {eyeIcon ? (
        <div
          className='reveal'
          onClick={() => {
            setReveal(!reveal);
          }}
        >
          <EyeIcon />
        </div>
      ) : null}

      <div
        className='error-container'
        ref={(ref) => {
          errorRef = ref;
        }}
        onClick={() => {
          errorRef.classList.toggle('show');
          console.log(errorRef);
        }}
      >
        {/* <p className='error-msg'>{`Name is asd as das sa dasfadfasd sainvalid`}</p> */}
        <p className='error-msg'>{error}</p>

        <div className='arrow-down'></div>

        <svg
          height='32'
          // style='overflow:visible;enable-background:new 0 0 32 32'
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
                <circle
                  cx='16'
                  cy='16'
                  id='bg'
                  r='16'
                  // style={{ fill: '#D72828' }}
                />
                <path
                  d='M14.5,25h3v-3h-3V25z M14.5,6v13h3V6H14.5z'
                  id='sign'
                  // style={{ fill: '#E6E6E6' }}
                />
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

export default ProfileInput;
