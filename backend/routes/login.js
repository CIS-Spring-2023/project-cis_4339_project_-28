const express = require("express");
const router = express.Router();
const { User } = require("../models/models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
