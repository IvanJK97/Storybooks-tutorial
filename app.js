const path = require("path");
const express = require("express");
// const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
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

// Middleware

// Body parser middleware to accept form data
app.use(express.urlencoded({ extended: false }));

// Method override for making PUT and DELETE requests since form methods are only GET/POST by default
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // Look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Sessions - * must be above Passport middleware * (so we don't logout when server refreshes)
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
// Commented out bc seems easier just to pass in "req.user" from needed route
// app.use(function (req, res, next) {
//   res.locals.user = req.user || null;
//   next();
// });

// Handlebars Helpers
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require("./helpers/hbs");

// Handlebars ** make sure /views/layouts is named properly
app.engine(
  ".hbs",
  exphbs.engine({
    helpers: {
      formatDate,
      stripTags,
      truncate,
      editIcon,
      select,
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
