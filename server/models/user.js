const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 1,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
  }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;