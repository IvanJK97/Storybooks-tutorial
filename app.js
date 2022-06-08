const path = require("path");
const express = require("express");
// const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");

// Load config
dotenv.config({ path: "./config/config.env" });

// Passport config
require("./config/passport")(passport);

connectDB();

const app = express();

// Body parser to accept form data
app.use(express.urlencoded({ extended: false }));

// Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Sessions - * must be above Passport middleware *
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    // https://www.npmjs.com/package/connect-mongo#options - Use session so user is logged in even if server refreshes
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set Express global variable, enable accessing logged in user from Hbs templates
// app.use(function (req, res, next) {
//   res.locals.user = req.user || null;
//   next();
// });

// Handlebars Helpers
const { formatDate, stripTags, truncate, editIcon } = require("./helpers/hbs");

// Handlebars ** make sure /views/layouts is named properly
app.engine(
  ".hbs",
  exphbs.engine({
    helpers: {
      formatDate,
      stripTags,
      truncate,
      editIcon,
    },
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/stories", require("./routes/stories"));

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
