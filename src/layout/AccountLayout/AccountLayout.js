import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../images/brand-logo.svg";
import letter from "../../images/Suche.svg";
import rightImg from "../../images/solution-experts.png";

import Input from "../../components/Input/Input";

import "./AccountLayout.css";

const LetterSvg = () => (
  <svg
    width="20px"
    height="16px"
    viewBox="0 0 20 16"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xlink="http://www.w3.org/1999/xlink"
  >
    <title>Suche</title>
    <desc>Created with Sketch.</desc>
    <g id="Login" stroke="none" strokeWidth="1" fillRule="evenodd">
      <g transform="translate(-197.000000, -399.000000)" id="Suche">
        <g transform="translate(197.000000, 399.000000)">
          <path
            d="M2,0 L18,0 C19.1046,0 20,0.8954 20,2 L20,14.00003 C20,15.10453 19.1046,16.00003 18,16.00003 L2,16.00003 C0.89543,16.00003 0,15.10453 0,14.00003 L0,2 C0,0.8954 0.89543,0 2,0 Z M10,7.00003 L18,2 L2,2 L10,7.00003 Z M2,14.00003 L18,14.00003 L18,4.37 L10,9.35863 L2,4.37 L2,14.00003 Z"
            id="Shape"
          ></path>
        </g>
      </g>
    </g>
  </svg>
);

const KeySvg = () => (
  <svg
    width="22px"
    height="12px"
    viewBox="0 0 22 12"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xlink="http://www.w3.org/1999/xlink"
  >
    <title>Suche</title>
    <desc>Created with Sketch.</desc>
    <defs>
      <path
        d="M11.6491154,5.00103707 C10.6991154,2.31103707 7.8991154,0.50103707 4.7691154,1.12103707 C2.4791154,1.58103707 0.6191154,3.41103707 0.1391154,5.70103707 C-0.6808846,9.57103707 2.2591154,13.0010371 5.9991154,13.0010371 C8.6091154,13.0010371 10.8291154,11.3310371 11.6491154,9.00103707 L15.9991154,9.00103707 L15.9991154,11.0010371 C15.9991154,12.1010371 16.8991154,13.0010371 17.9991154,13.0010371 C19.0991154,13.0010371 19.9991154,12.1010371 19.9991154,11.0010371 L19.9991154,9.00103707 C21.0991154,9.00103707 21.9991154,8.10103707 21.9991154,7.00103707 C21.9991154,5.90103707 21.0991154,5.00103707 19.9991154,5.00103707 L11.6491154,5.00103707 Z M5.9991154,9.00103707 C4.8991154,9.00103707 3.9991154,8.10103707 3.9991154,7.00103707 C3.9991154,5.90103707 4.8991154,5.00103707 5.9991154,5.00103707 C7.0991154,5.00103707 7.9991154,5.90103707 7.9991154,7.00103707 C7.9991154,8.10103707 7.0991154,9.00103707 5.9991154,9.00103707 Z"
        id="path-1"
      ></path>
    </defs>
    <g id="Login" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-196.000000, -488.000000)" id="Suche">
        <g transform="translate(196.000000, 487.000000)">
          <mask id="mask-2">
            <use href="#path-1"></use>
          </mask>
          <use id="Key" href="#path-1"></use>
        </g>
      </g>
    </g>
  </svg>
);

const Svg = ({ kind }) => {
  if (kind === "letter") {
    return <LetterSvg />;
  }
  if (kind === "key") {
    return <KeySvg />;
  } else return null;
};

const HeaderText = ({ kind }) => {
  if (kind === "login") {
    return <h1 className="header">login your account</h1>;
  }
  if (kind === "register") {
    return <h1 className="header">register your account</h1>;
  }
  return null;
};

const AccountLayout = (props) => {
  const { header, inputElements, hasRemember, onChange } = props;
  const { mail, password, confirm, name, phone } = props;
  const { login, register } = props;
  // const { rememberUser, setRemember } = props;

  const LoginPageBtn = () => (
    <div className="btn-container">
      <Link to="/register">
        <button type="button" className="button btn btn-primary btn-register">
          Register
        </button>
      </Link>

      <Link to="/profile">
        <button
          type="button"
          className="button btn btn-primary btn-login"
          onClick={() => login(mail, password)}
        >
          Login
        </button>
      </Link>
    </div>
  );

  const RegisterPageBtn = () => (
    <div className="btn-container">
      <Link to="/login">
        <button type="button" className="button btn btn-primary btn-register">
          Back
        </button>
      </Link>

      <button
        type="button"
        className="button btn btn-primary btn-login"
        onClick={() => register(mail, password, name, phone)}
      >
        Submit
      </button>
    </div>
  );

  const RememberElement = () => {
    // let check = localStorage.getItem("remember") === "true" ? true : false;

    const [check, setCheck] = useState(true);

    return (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          // defaultChecked={check}
          // checked={check}
          id="checkbox1"
          // onChange={(e) => {
          //   let isCheck =
          //     localStorage.getItem("remember") === "true" ? true : false;
          //   if (isCheck) {
          //     setCheck(true);
          //   } else {
          //     setCheck(false);
          //   }
          //   console.log(check);
          //   console.log(localStorage.getItem("remember"));
          //   setRemember();
          // }}
        />
        <label className="form-check-label" htmlor="checkbox1">
          Remember password
        </label>
      </div>
    );
  };

  return (
    <div className="layout-container">
      <div className="left">
        <div className="logo">
          <img src={logo} />
        </div>

        <span className="description">
          start your personal photo experience
        </span>

        {/* <h1 className="header">login your account</h1> */}
        <HeaderText kind={header} />

        <div className="input-group form">
          <div className="input-container">
            {inputElements.map(
              ({ label, placeholder, icon, fieldName }, index) => {
                return (
                  <Input
                    key={index}
                    label={label}
                    placeholder={placeholder}
                    icon={<Svg kind={icon} />}
                    fieldName={fieldName}
                    onChange={onChange}
                    mail={mail}
                    password={password}
                    confirm={confirm}
                    name={name}
                    phone={phone}
                  />
                );
              }
            )}
          </div>

          {header === "login" ? <LoginPageBtn /> : <RegisterPageBtn />}

          {hasRemember ? <RememberElement /> : null}
        </div>
      </div>

      <div className="right">
        <img src={rightImg} />
      </div>
    </div>
  );
};

export default AccountLayout;