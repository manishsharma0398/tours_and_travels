const express = require("express");
const router = express.Router();
const jwt = require("../validation/verifyToken");
const Profile = require("../models/Profile");

const profileInput = require("../validation/profile");

// set profile
router.post("/", jwt, async (req, res) => {
  const { errors, isValid } = profileInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const profileValues = {};
  profileValues.user = req.userId;

  if (req.body.username) profileValues.username = req.body.username;
  if (req.body.name) profileValues.name = req.body.name;
  if (req.body.gender) profileValues.gender = req.body.gender;

  const profileExists = await Profile.findOne({ user: req.userId });

  if (profileExists) {
    // update
    Profile.findOneAndUpdate(
      { user: req.userId },
      { $set: profileValues },
      { new: true }
    ).then(profile => res.json(profile));
  } else {
    // create
    Profile.findOne({ username: profileValues.username }).then(profile => {
      if (profile) {
        errors.username = "Username already taken";
        return res.status(400).json(errors);
      }

      // save profile
      new Profile(profileValues).save().then(profile => {
        res.json(profile);
      });
    });
  }
});

module.exports = router;
