import React, { useState, useEffect, useRef } from "react";

import "./Input.css";

// const setLineWidth = (el) => {
//   // if (el) {
//   //   // console.log("setLineWidth");
//   //   const widthStr = el.style.width;
//   //   const width = widthStr.substring(0, widthStr.length - 2);
//   //   // console.log(width);
//   //   el.style.width = `${width + 6}px`;
//   //   // lineEl.style.width = "200px";
//   //   console.log("LINE");
//   //   console.log(el);
//   // } else {
//   //   console.log("NULL");
//   // }
//   lineWidth += 50;
//   console.log(lineWidth);
// };

const Line = (props) => {
  // console.log(props);

  const [lineWidth, setLineWidth] = useState(50);

  if (props.width != lineWidth) {
    setLineWidth(props.width);
  }

  return (
    <div
      className="line"
      // id={`line-${fieldName}`}
      style={{ width: `${props.lineWidth}px` }}
    ></div>
  );
};

const Input = (props) => {
  const { label, icon, placeholder, fieldName, onChange } = props;
  const { mail, password, confirm, name, phone } = props;

  const mailRef = React.createRef();
  // console.log("RENDER");
  let inputEl;
  let iconEl;
  let lineEl;
  let lineWidth = 30;

  useEffect(() => {
    // lineWidth = 50;
    // console.log(mail);
    console.log(mailRef);
    if (
      fieldName === "mail" ||
      fieldName === "password" ||
      fieldName === "confirm" ||
      fieldName === "name" ||
      fieldName === "phone"
    ) {
      inputEl = document.querySelector(`#input-${fieldName}`);
      iconEl = document.querySelector(`#icon-${fieldName}`);
      // lineEl = document.querySelector(`#line-${fieldName}`);

      // inputEl.addEventListener("change", () => {
      //   console.log("TYPING");
      //   console.log(mail);
      // });
      // inputEl.addEventListener("input", (e) => {
      //   // onChange(e.target.value, fieldName);
      //   console.log("IS TYPING!");
      //   // console.log(mail);
      //   // lineWidth = setLineWidth(lineWidth + 6);
      //   lineWidth += 6;
      //   // handleLineWidth(lineWidth);
      //   console.log(lineWidth);
      //   // console.log(mailRef);
      //   // setLineWidth(lineEl);
      // });

      inputEl.addEventListener("focusin", () => {
        // console.log("IN FOCUS");
        iconEl.classList.toggle("bigger");
        // lineEl.style.width = "50px";
      });

      inputEl.addEventListener("focusout", () => {
        // console.log("OUT FOCUS");
        iconEl.classList.toggle("bigger");
      });

      // console.log(inputEl);
      // console.log(iconEl);
    }
  }, []);

  const handleLineWidth = (width) => {
    // mailRef.current.changeWidth(width);
    console.log(mailRef);
  };

  // const setRef = (el) => {
  //   mailRef = el
  // }

  const getValue = (fieldName) => {
    // console.log(fieldName);
    // return mail;
    if (fieldName === "mail") {
      return mail;
    }
    if (fieldName === "password") {
      return password;
    }
    if (fieldName === "confirm") {
      return confirm;
    }
    if (fieldName === "name") {
      return name;
    }
    if (fieldName === "phone") {
      return phone;
    }
  };

  return (
    <div className="input-wrapper">
      <label htmlFor="email">{label}</label>

      {fieldName === "mail" ? <Line width={lineWidth} /> : null}
      {/* {fieldName === "mail" ? (
        <div
          className="line"
          // id={`line-${fieldName}`}
          ref={mailRef}
          style={{ width: `${lineWidth}px` }}
        ></div>
      ) : null} */}

      <input
        className="form-control input"
        type="text"
        name={fieldName}
        placeholder={placeholder}
        value={getValue(fieldName)}
        // value={mail}
        onChange={(e) => {
          onChange(e.target.value, fieldName);
          // console.log(mail);
          // console.log(password);
          // console.log(confirm);
          // console.log(name);
          // console.log(phone);

          // console.log("IS TYPING!");
          // console.log(mail);
          // lineWidth = setLineWidth(lineWidth + 6);
          lineWidth += 6;
          // handleLineWidth(lineWidth);
          // console.log(lineWidth);
          // console.log(mailRef);
          // setLineWidth(lineEl);
        }}
        // onInput={(e) => {}}
        id={`input-${fieldName}`}
      />

      <div id={`icon-${fieldName}`} className="icon">
        {icon}
      </div>
    </div>
  );
};

export default Input;
