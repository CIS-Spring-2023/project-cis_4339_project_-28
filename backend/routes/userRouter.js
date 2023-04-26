const express = require("express");
const router = express.Router();

const { User } = require("../models/models");
//hash passwrod
const bcrypt = require("bcrypt");

// POST new user
router.post("/createUser", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
