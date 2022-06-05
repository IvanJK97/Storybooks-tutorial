# Commits

1. Setup Express Server, connect to MongoDB, and created login page and some layouts
   a. Setup Express in `app.js` in root and available routes at `routes/index.js`
   b. Connect to MongoDB in `config/db.js`
   c. Layouts created in `views/layouts` and login & dashboard pages in `views`
2. Enabled authentication with Google OAuth 2.0 and Passport
   a. Configured strategy in `config/passport.js`
   b. Created user model in `models/User.js` for what user data's shape would be
   c. Created routes to login and logout in `routes/auth.js`
   d. Added auth middleware to protected routes and login page in `middleware/auth.js`
3. Show users' stories, add story form page, and add story functionality
   a. Created story model in `models/Story.js` for story's shape
   b. Show user's stories in `dashboard`
   c. Created routes for stories in `routes/stories.js` - GET add form and POST functionality
   d. Added error pages in `views/error` and partial template `views/partials/_add_btn.hbs`, which gets inserted into other pages

# Setup and dependencies use

- npm init
- npm i express mongoose connect-mongo express-session express-handlebars dotenv method-override moment morgan passport passport-google-oauth20
- npm i -D nodemon cross-env

## Styling and icon libraries imported to layouts

https://materializecss.com/getting-started.html
https://cdnjs.com/libraries/font-awesome
https://cdnjs.com/libraries/ckeditor - For embedded text editor

See `views\layouts\main.hbs` - need to import and initialized there

# Google Cloud Platform

https://console.cloud.google.com/getting-started?project=storybooks-traversy-project&supportedpurview=project

# Enabled APIs and Services

- Google+ API
