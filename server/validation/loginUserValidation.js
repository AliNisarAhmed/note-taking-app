const Joi = require('joi');

const loginUserSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(1).required(),
  password: Joi.string().min(1).required(),
});

module.exports = loginUserSchema;