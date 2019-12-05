const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();


//
// Notes
//

const notesSchema = new mongoose.Schema({
  id: String,
  x: Number,
  y: Number,
  height: Number,
  width: Number,
  title: String,
  text: String
});

const Note = mongoose.model('Note', notesSchema);

router.get('/', async(req, res) => {
  try {
    let notes = await Note.find();
    return res.send(notes);
  }
  catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post('/', async(req, res) => {
  const note = new Note({
    x: 0,
    y: 0,
    height: 100,
    width: 100,
    title: req.body.title,
    text: req.body.text
  });
  try {
    await note.save();
    return res.send(note);
  }
  catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete('/:id', async(req, res) => {
  try {
    await Note.deleteOne({
      _id: req.params.id
    });
    return res.sendStatus(200);
  }
  catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
