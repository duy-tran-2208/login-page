const PASSWORD_REGEX = new RegExp(
  /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8}/
);
// const MAIL_REGEX = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
const MAIL_REGEX = new RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const NAME_REGEX = new RegExp(/^[a-zA-Z ]+$/);
const PHONE_REGEX = new RegExp(/^\d+$/);

const validPassword = (pass) => {
  const isValid = PASSWORD_REGEX.test(pass);

  if (isValid) {
    return true;
  }
  return false;
};

const validMail = (mail) => {
  const isValid = MAIL_REGEX.test(mail);

  if (isValid) {
    return true;
  }
  return false;
};

const validName = (name) => {
  const isValid = NAME_REGEX.test(name);

  if (isValid) {
    return true;
  }
  return false;
};

const validPhone = (phone) => {
  const isValid =
    PHONE_REGEX.test(phone) && (phone.length == 10 || phone.length == 11);

  if (isValid) {
    return true;
  }
  return false;
};

const validConfirm = (pass, confirmPass) => {
  return pass == confirmPass;
};

export { validPassword, validMail, validName, validPhone, validConfirm };
