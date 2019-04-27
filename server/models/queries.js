const User = require('./user');
const Note = require('./note');

// ==== NOTES FUNCTIONS ====

function getAllNotes(userId) {
  return Note.find({ creator_id: userId }).exec();
}

function createNote(noteObj) {
  return Note.create(noteObj);
}

function updateNote(noteId, updates) {
  return Note.findByIdAndUpdate(noteId, {...updates, updatedOn: Date.now() }, { new: true }).exec();
}

function findNoteById(noteId) {
  return Note.findById(noteId).exec();
}

function deleteNote(noteId) {
  return Note.findByIdAndDelete(noteId).exec();
}

// ++++ User Functions ++++

function findUserByUsername(username) {
  return User.findOne({username}).exec();
}

function createUser(userObj) {
  return User.create(userObj);
}

module.exports = {
  
  // Note functions 
  getAllNotes,
  createNote,
  findNoteById,
  deleteNote,
  updateNote,

  // User functions
  findUserByUsername,
  createUser,
}