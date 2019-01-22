const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan'); // for debugging
const routes = require('./routes');
const config = require('config');
const PORT = process.env.PORT || 3001;

// Initialize Express for debugging & body parsing
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Add routes, both API and view
app.use(routes);

const db = config.get('MongoDB.URI');

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
