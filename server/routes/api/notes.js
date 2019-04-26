  const router = require('express').Router();
  const dbQuery = require('../../models/queries');
  const asyncMiddleware = require('../../errorHandler/asyncMiddleware');

  router.get('/', asyncMiddleware(async (req, res) => {
    const notes = await dbQuery.getAllNotes();
    return res.json(notes);
  }));

  router.post('/', asyncMiddleware(async (req, res) => {
    const { title, creator, text } = req.body;
    const newNote = await dbQuery.createNote({ title, creator, text });
    return res.json(newNote);
  }));

  module.exports = router;