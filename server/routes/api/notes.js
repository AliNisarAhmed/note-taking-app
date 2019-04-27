const router = require('express').Router();
const boom = require('boom');
const Joi = require('joi');

const dbQuery = require('../../models/queries');
const createNoteSchema = require('../../validation/createNoteValidation');
const updateNoteSchema = require('../../validation/updateNoteSchema');
const asyncMiddleware = require('../../errorHandler/asyncMiddleware');
const authMiddleware = require('../auth/authMiddleware');


// **** GET - All notes (requried login) - /api/notes ****

router.get('/', authMiddleware, asyncMiddleware(async (req, res) => {
  const { user } = req;
  const notes = await dbQuery.getAllNotes(user.id);
  return res.json(notes);
}));


// **** POST - Create a post (requires login) - /api/notes/create ****

router.post('/create', authMiddleware, asyncMiddleware(async (req, res) => {
  const { user } = req;
  
  // Validating title and text field submitted by the client

  const { error, value } = Joi.validate(req.body, createNoteSchema);
  if (error) throw boom.badRequest(error);
  
  // extracting title, text after validation
  const { title, text } = value;

  const noteObj = {
    title,
    text,
    creator: user.username,
    creator_id: user.id
  };
  
  const newNote = await dbQuery.createNote(noteObj);
  if (!newNote) throw boom.internal('Could not create note, please try again');
  return res.status(200).json(newNote);
}));


// **** DELETE - Delete a post (requires login) - /api/notes/:noteId

router.delete('/:noteId', authMiddleware, asyncMiddleware(async (req, res) => {
  const { user } = req;
  const { noteId } = req.params;


  const foundNote = await dbQuery.findNoteById(noteId);
  if (!foundNote) throw boom.badRequest('Invalid Note Id');

  // Comparing two MongoDB IDs, conerting both to Strings for comparison
  if (String(foundNote.creator_id) === String(user.id)) {
    // User is indeed the author of the note, hence he is allowed to delete it.
    const deletedNote = await dbQuery.deleteNote(noteId);
    if (deletedNote) return res.status(200).json({ success: true });  
  }
  
  throw boom.badRequest('Failed to delete the note');

}));


// **** PUT - update a note (requires login) - api/notes/:noteId

router.put('/:noteId', authMiddleware, asyncMiddleware(async (req, res) => {
  const { user } = req;
  const { noteId } = req.params;

  const { error, value } = Joi.validate(req.body, updateNoteSchema);
  if (error) throw boom.badRequest('Fields cannot be empty');


  const foundNote = await dbQuery.findNoteById(noteId);
  if (!foundNote) throw boom.badRequest('Invalid Note Id');

  if (String(foundNote.creator_id) === String(user.id)) {
    const updatedNote = await dbQuery.updateNote(noteId, value);
    if (!updatedNote) throw boom.internal('Could not modify note, please try again');
    return res.status(200).json(updatedNote);
  }
  throw boom.unauthorized('You are not authorized to modify this note');

}));


module.exports = router;