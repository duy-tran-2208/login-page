import React, { useState, useEffect } from "react";

import "./ProfileInput.css";

const EyeIcon = () => (
  <svg
    width="18px"
    height="12px"
    viewBox="0 0 18 12"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xlink="http://www.w3.org/1999/xlink"
  >
    <title>Suche</title>
    <desc>Created with Sketch.</desc>
    <defs>
      <path
        d="M9,0.375 C5.25,0.375 2.0475,2.7075 0.75,6 C2.0475,9.2925 5.25,11.625 9,11.625 C12.75,11.625 15.9525,9.2925 17.25,6 C15.9525,2.7075 12.75,0.375 9,0.375 Z M9,9.75 C6.93,9.75 5.25,8.07 5.25,6 C5.25,3.93 6.93,2.25 9,2.25 C11.07,2.25 12.75,3.93 12.75,6 C12.75,8.07 11.07,9.75 9,9.75 Z M9,3.75 C7.755,3.75 6.75,4.755 6.75,6 C6.75,7.245 7.755,8.25 9,8.25 C10.245,8.25 11.25,7.245 11.25,6 C11.25,4.755 10.245,3.75 9,3.75 Z"
        id="path-1"
      ></path>
    </defs>
    <g id="Login" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-504.000000, -488.000000)" id="Suche">
        <g transform="translate(504.000000, 488.000000)">
          <mask id="mask-2" fill="white">
            <use href="#path-1"></use>
          </mask>
          <use id="Eye" href="#path-1"></use>
        </g>
      </g>
    </g>
  </svg>
);

const ProfileInput = ({
  id,
  label,
  name,
  placeholder,
  type,
  key,
  eyeIcon,
  value,
  onChange,
}) => {
  const [reveal, setReveal] = useState(true);

  useEffect(() => {
    if (eyeIcon) {
      setReveal(false);
    }
  }, []);

  return (
    <div className="profile-input-container" id={id}>
      <label htmlFor="fullName">{label}</label>

      <input
        className="form-control input"
        type={reveal ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
      />

      {eyeIcon ? (
        <div
          className="reveal"
          onClick={() => {
            console.log("CLICK");
            setReveal(!reveal);
          }}
        >
          {/* <EyeIcon key={key} /> */}
          <EyeIcon />
        </div>
      ) : null}
    </div>
  );
};

export default ProfileInput;
