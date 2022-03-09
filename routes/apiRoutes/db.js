const router = require('express').Router();
const { createNewNote, validateNote } = require('../../lib/db')
const { v4: uuidv4 } = require("uuid");
const { notes } = require("../../db/db");

router.get("/notes", (req, res) => {
  res.json(notes);
});

router.post("/notes", (req, res) => {
  console.log(req.body);
  //set id with uuid
  req.body.id = uuidv4();

  if (!validateNote(req.body)) {
    res.status(400).send("The note is not properly formatted.");
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

module.exports = router;