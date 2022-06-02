module.exports = {
  ensureAuth: function (req, res, next) {
    // Redirect to login page for protected routes that needs signing in
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
    }
  },
  ensureGuest: function (req, res, next) {
    // Redirect to dashboard page if user is signed in and goes to login page
    if (req.isAuthenticated()) {
      res.redirect("/dashboard");
    } else {
      return next();
    }
  },
};
