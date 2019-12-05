const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('../public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/notes', {
  useNewUrlParser: true
});

const notes = require("./notes.js");
app.use("/api/notes", notes);

app.listen(3005, () => console.log('Server listening on port 3005!'));