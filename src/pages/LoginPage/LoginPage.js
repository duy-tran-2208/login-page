import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import axios from "axios";
import jwt from "jsonwebtoken";
import encode from "../../util/encode";
import decode from "../../util/decode";

import "./LoginPage.css";
import logo from "../../images/brand-logo.svg";
import letter from "../../images/Suche.svg";
import rightImg from "../../images/solution-experts.png";

import AccountLayout from "../../layout/AccountLayout/AccountLayout";
import Input from "../../components/Input/Input";

// const LetterSvg = () => (
//   <svg
//     width="20px"
//     height="16px"
//     viewBox="0 0 20 16"
//     version="1.1"
//     xmlns="http://www.w3.org/2000/svg"
//     xlink="http://www.w3.org/1999/xlink"
//   >
//     <title>Suche</title>
//     <desc>Created with Sketch.</desc>
//     <g id="Login" stroke="none" strokeWidth="1" fillRule="evenodd">
//       <g transform="translate(-197.000000, -399.000000)" id="Suche">
//         <g transform="translate(197.000000, 399.000000)">
//           <path
//             d="M2,0 L18,0 C19.1046,0 20,0.8954 20,2 L20,14.00003 C20,15.10453 19.1046,16.00003 18,16.00003 L2,16.00003 C0.89543,16.00003 0,15.10453 0,14.00003 L0,2 C0,0.8954 0.89543,0 2,0 Z M10,7.00003 L18,2 L2,2 L10,7.00003 Z M2,14.00003 L18,14.00003 L18,4.37 L10,9.35863 L2,4.37 L2,14.00003 Z"
//             id="Shape"
//           ></path>
//         </g>
//       </g>
//     </g>
//   </svg>
// );

const inputElements = [
  {
    label: "Email",
    placeholder: "Enter your mail",
    icon: "letter",
    fieldName: "mail",
  },
  {
    label: "Password",
    placeholder: "Enter your password",
    icon: "letter",
    fieldName: "password",
  },
];

// let rememberUser = true;

// const setRemember = () => {
//   // setRememberPass(!rememberPass);
//   rememberUser = !rememberUser;
//   if (rememberUser) {
//     localStorage.setItem("remember", "true");
//   } else {
//     localStorage.setItem("remember", "false");
//   }
//   console.log("SET REMEMBER" + rememberUser);
// };

const LoginPage = (props) => {
  console.log("RENDER");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  console.log("PASS" + password);

  const { checkAuth } = props;
  let loginSuccess = "unknown";

  const fetchData = async (mail, password) => {
    try {
      const info = {
        email: mail,
        password,
      };

      const res = await axios.post(
        "http://api.terralogic.ngrok.io/api/login",
        info
      );

      // console.log(res.status);

      console.log(res.data);
      const { msg, token } = res.data;

      loginSuccess = "success";
      // if (msg === "login succeeded") {
      // } else {
      // }

      localStorage.setItem("token", token);
      localStorage.setItem("loginStatus", "success");

      const tokenData = localStorage.getItem("token");
      const profile = jwt.decode(tokenData);
      console.log(profile);

      const success = checkAuth();
      // console.log("CHECK AUTH HERE");

      if (success) {
        props.history.push("/profile");
        console.log(token);

        // if (rememberUser) {
        //   console.log("SET PASS");
        //   console.log(encode(password));
        //   localStorage.setItem("rememberPass", encode(password));
        //   console.log(decode(localStorage.getItem("rememberPass")));
        // } else {
        //   console.log("NOT SET PASS");
        //   localStorage.removeItem("rememberPass");
        // }
      }
    } catch (error) {
      loginSuccess = "failed";
      localStorage.setItem("loginStatus", "failed");
      console.log(error);
    }

    // return res.data;
  };

  // const setRemember = (isRemembered) => {
  //   setRememberPass(isRemembered);
  //   console.log("SET REMEMBER" + rememberPass);
  // };

  useEffect(() => {
    // setRemember();
    console.log("USE EFFECT");
    localStorage.setItem("loginStatus", "failed");
    localStorage.removeItem("token");

    // Remember user
    // if (!rememberUser) {
    //   localStorage.removeItem("rememberPass");
    //   setPassword("");
    // }
    // const localPass = localStorage.getItem("rememberPass");

    // if (rememberUser && localPass !== "") {
    //   console.log("SET DECODED PASS");
    //   setPassword(decode(localPass));
    //   console.log("SET PASSWORD");
    //   console.log(localPass);
    // }
  }, []);

  const onChange = (value, fieldName) => {
    if (fieldName === "mail") {
      setMail(value);
    }
    if (fieldName === "password") {
      setPassword(value);
    }
  };

  const login = (mail, password) => {
    console.log(mail);
    console.log(password);
    fetchData(mail, password);
  };

  return (
    <div className="login-page-container">
      <AccountLayout
        header="login"
        inputElements={inputElements}
        hasRemember={true}
        onChange={onChange}
        mail={mail}
        password={password}
        login={login}
        loginSuccess={loginSuccess}
        // rememberUser={rememberUser}
        // setRemember={setRemember}
      />
    </div>
  );
};

export default withRouter(LoginPage); // wrap with "withRouter" to get "history" prop
