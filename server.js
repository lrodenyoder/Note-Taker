const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static('public'));


// //use api routes
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

//move to other files later
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require("uuid");
const { notes } = require('./db/db');



//move to other files later
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    //set id with uuid
    req.body.id = uuidv4();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});




function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note)

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    return body;
};

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }

    return true;
};











app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});