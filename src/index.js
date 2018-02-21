const path = require('path')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// Creates an Express application.
// The app object has methods for
// - Routing HTTP requests; see for example, app.METHOD and app.param.
// - Configuring middleware; see app.route.
// - Rendering HTML views; see app.render.
// - Registering a template engine; see app.engine.
// - It also has settings (properties) that affect how the application behaves; 
// for more information, see Application settings.
const app = express()
app.use(cors())
app.use(bodyParser());

app.use(express.static(path.join(__dirname, 'public')))

// Database Setup
mongoose.connect('mongodb://mongo:27017');

// Define our User model
const User = mongoose.model('User', {
  username: String,
  password: String
});

// Create NEW User
app.post('/user', (req, res) => {
  const user = new User({
    ...req.body,
  });

  user.save().then(_user => res.send(_user));
});

// Get ALL Users
app.get('/user', (req, res) => {
  User.find({}).then((results) => res.send(results));
});

// Get specific User
app.get('/user/:username', (req, res) => {
  User.find({ username: req.params.username }).then((results) => res.send(results));
});

// Starts a UNIX socket and listens for connections on the given path. This 
// method is identical to Node’s http.Server.listen().
app.listen(3000, () => console.log('app listening on port 3000'))
