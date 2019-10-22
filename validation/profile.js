const Validator = require("validator");
const isEmpty = require("./is-Empty");

module.exports = function validateProfileInputs(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";

  if (!Validator.isLength(data.name, { min: 4 })) {
    errors.name = "Name should atleast be 4 characters long";
  }

  if (!Validator.isLength(data.username, { min: 6 })) {
    errors.username = "Username should atleast be 6 characters long";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "name is required";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "username is required";
  }

  if (Validator.isEmpty(data.gender)) {
    errors.gender = "gender is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
