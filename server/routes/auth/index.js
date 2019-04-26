const router = require('express').Router();
const boom = require('boom');
const Joi = require('joi');
const bcrypt = require('bcrypt');
// const jwt = require('jwt');

const dbQuery = require('../../models/queries');
const asyncMiddleware = require('../../errorHandler/asyncMiddleware');
const registerUserSchema = require('../../validation/registerUserValidation');

// **** POST - Register Route /api/auth/register ****

router.post('/register', asyncMiddleware(async (req, res) => {
  const { error, value } = Joi.validate(req.body, registerUserSchema);
  if (error) throw boom.badRequest(error);

  const { username, password } = value;

  const searchedUsername = await dbQuery.findUserByUsername(username);
  if (searchedUsername) throw boom.badRequest('Username already exists, please try something else');

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = dbQuery.createUser({
    username, password: hashedPassword
  });

  if (!newUser) throw boom.internal('User could not be craeted, please try again');

  return res.status(200).json({ username });
}));





module.exports = router;