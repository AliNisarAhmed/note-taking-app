const Joi = require('joi');

const updateNoteSchema = Joi.object().min(1).keys({
  title: Joi.string().min(1).max(30).optional(),
  text: Joi.string().min(1).optional()
});

module.exports = updateNoteSchema;