const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// //use api routes
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

//move to lib/db.js
const fs = require('fs');
const path = require('path');
//move to apiRoutes
const { v4: uuidv4 } = require("uuid");
const { notes } = require('./db/db');


//move to apiRoutes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

//move to apiRoutes
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

//move to htmlRoutes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


//move to lib/db.js 
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note)

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    return body;
};

//move to lib/db.js 
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