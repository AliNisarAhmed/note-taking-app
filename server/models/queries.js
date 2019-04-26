const User = require('./user');
const Note = require('./note');

function getAllNotes() {
  return Note.find({}).exec();
}

function createNote(noteObj) {
  return Note.create(noteObj);
}

module.exports = {
  getAllNotes,
  createNote,
}