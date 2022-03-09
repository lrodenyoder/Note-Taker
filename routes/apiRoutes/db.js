const router = require('express').Router();
const { createNewNote, deleteNote, validateNote, findById } = require('../../lib/db')
const { v4: uuidv4 } = require("uuid");
const { notes } = require("../../db/db");

router.get("/notes", (req, res) => {
  res.json(notes);
});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
})
// router.get('/notes/:id', (req, res) => {
//     const result = findById(req.params.id, notes);
//     if (result) {
//         res.json(result);
//     } else {
//         res.send(404);
//     }
// });

// router.delete('/notes/:id', (req, res) => {
//     const result = findById(req.params.id, notes);
//     if (result) {
//         res.send();
//     } else {
//         res.send(404);
//     }
// });
router.delete('/notes/:id', (req, res) => {
    const newArray = deleteNote(req.params.id, notes);
    res.json(newArray);
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