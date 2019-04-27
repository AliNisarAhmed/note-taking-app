const Joi = require('joi');

const createNoteSchema = Joi.object().keys({
  title: Joi.string().min(1).required(),
  text: Joi.string().min(1).required(),
});

module.exports = createNoteSchema; 

