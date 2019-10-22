const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// auth
const User = require("../models/User");

const validateLoginInputs = require("../validation/login");
const validateRegisterInputs = require("../validation/register");

router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInputs(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = {
      email: req.body.email,
      password: req.body.password
    };
    const userExists = await User.findOne({ email: user.email });
    if (!userExists) {
      errors.email = "Email not found";
      return res.status(400).json(errors);
    }

    // check for correct password
    const validPass = await bcrypt.compare(user.password, userExists.password);

    if (!validPass) {
      errors.password = "Password Incorrect!";
      return res.status(400).json(errors);
    }

    // login success

    // create token
    const token = jwt.sign({ _id: userExists.id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
  } catch (err) {
    console.log(err);
    errors.error = "Something went wrong. Please try again";
    return res.status(400).json(errors);
  }
});

// signup
router.post("/signup", async (req, res) => {
  const { errors, isValid } = validateRegisterInputs(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      errors.email = "Email already registered with another account";
      return res.status(400).json(errors);
    } else {
      const newUser = {
        email: req.body.email,
        password: req.body.password
      };

      // hash the password
      bcrypt.hash(newUser.password, 10, async (err, hash) => {
        try {
          newUser.password = hash;
          // add new user
          const addingNewUser = await new User(newUser).save();
          return res.status(200).json(addingNewUser);
        } catch (err) {
          console.log(err);
          errors.error = "Something went wrong. Please try again";
          return res.status(400).json(errors);
        }
      });
    }
  } catch (err) {
    console.log(err);
    errors.error = "Something went wrong. Please try again";
    return res.status(400).json(errors);
  }
});

module.exports = router;
