const express = require("express");
const router = express.Router();

//  @desc Landing/Login page
//  @route GET /
router.get("/", (req, res) =>
  // Use login.hbs layout instead of main.hbs
  res.render("login", {
    layout: "login",
  })
);

//  @desc Dashboard
//  @route GET /dashboard
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

module.exports = router;
