const User = require('./user');
const Note = require('./note');

function getAllNotes() {
  return Note.find({}).exec();
}

function createNote(noteObj) {
  return Note.create(noteObj);
}

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

  // User functions
  findUserByUsername,
  createUser,
}