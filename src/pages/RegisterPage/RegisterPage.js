import React, { useState, useEffect } from "react";

import "./Register.css";

import AccountLayout from "../../layout/AccountLayout/AccountLayout";
import axios from "axios";

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
    icon: "key",
    fieldName: "password",
  },
  {
    label: "Confirm Password",
    placeholder: "Enter your password",
    icon: "key",
    fieldName: "confirm",
  },
  {
    label: "Full Name",
    placeholder: "Enter your name",
    icon: "letter",
    fieldName: "name",
  },
  {
    label: "Phone number",
    placeholder: "Enter your phone number",
    icon: "letter",
    fieldName: "phone",
  },
];

const RegisterPage = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // console.log(mail);
  // console.log(password);
  // console.log(confirm);
  // console.log(name);
  // console.log(phone);

  const register = async (mail, password, name, phone) => {
    try {
      // const info = {
      //   email: "rtest",
      //   password: "123",
      //   name: "RTest Name",
      //   phone: "0123456789",
      // };

      const info = {
        email: mail,
        password,
        name,
        phone,
      };

      const res = await axios.post(
        "http://api.terralogic.ngrok.io/api/register",
        info
      );

      console.log(res);

      localStorage.setItem("registerStatus", "success");
    } catch (err) {
      localStorage.setItem("registerStatus", "failed");
      console.log(err);
    }
  };

  const onChange = (value, state) => {
    // console.log("CHANGE");
    if (state === "mail") {
      setMail(value);
    }

    if (state === "password") {
      setPassword(value);
    }

    if (state === "confirm") {
      setConfirm(value);
    }

    if (state === "name") {
      setName(value);
    }

    if (state === "phone") {
      setPhone(value);
    }
  };

  return (
    <div className="register-page-container">
      <AccountLayout
        header="register"
        inputElements={inputElements}
        hasRemember={false}
        onChange={onChange}
        mail={mail}
        password={password}
        confirm={confirm}
        name={name}
        phone={phone}
        register={register}
      />
    </div>
  );
};

export default RegisterPage;
