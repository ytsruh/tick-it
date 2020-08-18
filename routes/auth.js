const express = require("express");
const router = express.Router();
const { User } = require("../db");
const passport = require("passport");
const jwt = require("jsonwebtoken");

/*
    Set routes
*/

// Register new user
router.post("/register", async (req, res, next) => {
  try {
    const data = await User.create(req.body);
    res.json({ message: "Sucessfully registered", body: data });
  } catch (err) {
    next(err);
  }
});

// Log a user in
router.post("/login", passport.authenticate("local", { session: false }), async (req, res, next) => {
  // if user is found and password is correct, create a token
  const data = {
    id: req.user.id,
    username: req.user.username,
    name: req.user.name,
  };
  try {
    const token = jwt.sign(data, process.env.SECRET);
    res.json({ message: "Successfully logged in", token, role: req.user.role });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
