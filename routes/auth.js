const express = require("express");
const passport = require("passport");
const router = express.Router();

//  @desc Auth with Google (to auth)
//  @route GET /auth/google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

//  @desc Google auth callback (post auth)
//  @route GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// @desc Logout user
// @route /auth/logout
router.get("/logout", (req, res, next) => {
  // Passport middleware will have logout method on req once logged in
  //   console.log(req);
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
