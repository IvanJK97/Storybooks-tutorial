Following tutorial from Traversy Media: https://youtu.be/SBvmnHTQIPY

- Create a Node.js + Express + Handlebars + MongoDB + Google OAuth (Server-side rendering) application
- CRUD functionality with stories (basically text posts).
- Users can view their own stories in dashboard, all public stories, and another user's public stories.

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
   b. Show user's stories in template `dashboard.hbs` and route `/dashboard`
   c. Created routes for stories in `routes/stories.js` - GET add form (`/stories/add`) and POST functionality (`/stories/`)
   d. Added error pages in `views/error` and partial template `views/partials/_add_btn.hbs`, which gets inserted into other pages
4. Show all public stories with route `/stories` and template at `stories/index.hbs`
   a. Added helpers in `/helpers/hbs.js` to format date, truncate long stories, strip out tags
   b. Conditionally show edit icon on stories through logic in `/helpers/hbs.js`
5. Enabled editing stories with route `/stories/edit/:id` to edit story with id and route `/stories/:id` to handle submit edits
   a. Added edit story template in `stories/edit.hbs`, mostly the same as add template but with fields filled out
   b. Added select helper so dropdown menu have the right field when editing
   c. Added method override middleware for making PUT and DELETE requests since form methods are only GET/POST by default
6. Enabled deleting stories with DELETE route `/stories/:id` from user's `dashboard.hbs`.
   a. Also used method override middleware for DELETE request here
   Show single story with route `/stories/:id` and view `stories/show.hbs`
   a. View full story by clicking "Read More" or link to story in Dashboard
   View all public stories from user with route `/stories/user/:userId` and reuse view of `stories/index.hbs`
   a. View user stories from clicking on user link or "More from {user}" in full story page

# Notes

- Triple curly brace in handlebars to render HTML, double curly brace for regular JavaScript/strings
- Put environment variables and secrets in `config/config.env`, which is ignored by Git
- Use Mongoose API on created data models like `Story.find` or `User.create`; see `routes/stories.js` for examples or search this project

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
