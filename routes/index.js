const express = require("express");
const router = express.Router();
const passport = require("passport");
const { validate, loginValidation, validateLogin } = require("../middleware/validator");

//Import routes
const auth = require("./auth");
const users = require("./users");
const tickets = require("./tickets");

//Set auth route
router.use("/auth", auth);

// router.get("/", validate(loginValidation, { keyByField: true }, {}), (req, res) => {
//   res.json({ message: "Success! No validation issues." });
// });
router.get("/", validateLogin(), (req, res) => {
  res.json({ message: "Success! No validation issues." });
});
//Authenticate next routes
router.use(passport.authenticate("jwt", { session: false }));
router.use((req, res, next) => {
  //console.log(req.user);
  next();
});

//Set next routes
router.use("/users", users);
router.use("/tickets", tickets);

module.exports = router;
