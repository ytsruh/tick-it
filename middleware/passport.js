const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../db");

// By default, LocalStrategy expects to find credentials in parameters named username and password. If your site prefers to name these fields differently, options are available to change the defaults.
const Local = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({
      where: { username },
    });
    if (!user) {
      return done(null, false);
      //return done(null, false, { message: "Incorrect username." });
    }
    if (!user.validPassword(password, user.password)) {
      console.log("bad password");
      return done(null, false);
      // return done(null, false, { message: "Incorrect password." });
    }
    return done(null, user);
  } catch (err) {
    console.log(err);
    return done(err);
  }
});

const JwtStrategy = require("passport-jwt").Strategy;
// Custom function to extract token from query string
const tokenExtractor = (req) => {
  let token = null;
  if (req && req.query.token) {
    token = req.query.token;
  }
  return token;
};
const opts = {
  jwtFromRequest: tokenExtractor,
  secretOrKey: process.env.SECRET,
};

const JWT = new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await User.findOne({
      where: { username: jwt_payload.username },
    });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
      //return done(null, false, { message: "Incorrect username." });
    }
  } catch (err) {
    console.log(err);
    return done(err);
  }
});

module.exports = {
  Local,
  JWT,
};
