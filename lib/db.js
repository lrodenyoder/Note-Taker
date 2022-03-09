const fs = require('fs');
const path = require('path');
 
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note)

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    return body;
};

function deleteNote(id, notesArray) {
    console.log('working')
    let updatedArray = notesArray.filter(function (note) {
        return note.id !== id;
    })

    fs.writeFileSync(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify({ notes: updatedArray }, null, 2)
    );

    //console.log(updatedArray)

    return updatedArray;

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

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    console.log(result);
    return result
}

module.exports = {
    createNewNote,
    deleteNote,
    validateNote,
    findById,
};