const Validator = require("validator");
const isEmpty = require("./is-Empty");

module.exports = function validateRegisterInputs(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Please enter a valid email";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (!Validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password should atleast be 6 characters long";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
