const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// auth
const User = require("../../models/User");

router.post("/login", async (req, res) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password
    };
    const userExists = await User.findOne({ email: user.email });
    if (!userExists) {
      return res.status(400).json({ error: "Email not found" });
    }

    // check for correct password
    bcrypt.compare(user.password, userExists.password, (err, correctPass) => {
      if (!correctPass) {
        return res.status(400).json({ error: "Password Incorrect!" });
      }
      return res.status(200).json({ success: "Successfully logged in" });
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      return res
        .status(400)
        .json("Email already registered with another account");
    } else {
      const newUser = {
        email: req.body.email,
        password: req.body.password
      };

      // hash the password
      bcrypt.hash(newUser.password, 10, (err, hash) => {
        newUser.password = hash;

        // add new user
        new User(newUser)
          .save()
          .then(user => res.status(200).json(user))
          .catch(err => res.status(400).json(err));
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
