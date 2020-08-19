require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const app = express();

//Config middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.set("json spaces", 2); // Set json pretty printing
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Require & use Passport
app.use(passport.initialize());
const strategy = require("./middleware/passport");
passport.use("local", strategy.Local);
passport.use("jwt", strategy.JWT);

//Import routes
const api = require("./routes");
app.use("/api/", api);

// Serve React App
// Serve static files from the React app
app.use(express.static("build"));
// Always return the main index.html, so react-router render the route in the client
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

// Handle route not found (404)
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: "Route: " + req.url + " - not found.",
  });
});

// Handle errors
const { ValidationError } = require("./middleware/validator");
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof ValidationError) {
    console.log("Data in body was not correctly validated");
    return res.status(err.statusCode).json({ message: "Error. There was an issue with the input data", err });
  } else {
    res.status(500).json({
      message: "Something broke",
      error: err.stack,
      status: 500,
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
});
