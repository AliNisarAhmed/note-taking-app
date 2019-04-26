const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
  },
  creator: {
    type: String,
    required: true,
  },
  creator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  updatedOn: {
    type: Date,
    default: Date.now(),
  },
  text: {
    type: String,
    minlength: 1,
  }
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;