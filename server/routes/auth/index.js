const router = require('express').Router();
const boom = require('boom');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dbQuery = require('../../models/queries');
const asyncMiddleware = require('../../errorHandler/asyncMiddleware');
const registerUserSchema = require('../../validation/registerUserValidation');
const loginUserSchema = require('../../validation/loginUserValidation');

// **** POST - Register Route /api/auth/register ****

router.post('/register', asyncMiddleware(async (req, res) => {
  // Validating req.body: checking if it contains fields => username, password and password2
  const { error, value } = Joi.validate(req.body, registerUserSchema);
  if (error) throw boom.badRequest(error);

  const { username, password } = value;

  // Checking if the username chosen by the user is unique (i.e.) does'nt already exist in DB
  const foundUsername = await dbQuery.findUserByUsername(username);
  if (foundUsername) throw boom.badRequest('Username already exists, please try something else');

  // Hashing the password before saving to the DB
  const hashedPassword = await bcrypt.hash(password, 10);

  // Saving the user details in the DB
  const newUser = await dbQuery.createUser({
    username, password: hashedPassword
  });

  // if somehow user is not created, we throw an error
  if (!newUser) throw boom.internal('User could not be created, please try again');

  return res.status(200).json({ username });
}));


// **** POST - Login Route /api/auth/login ****

router.post('/login', asyncMiddleware(async (req, res) => {
  // Validation
  const { error, value } = Joi.validate(req.body, loginUserSchema);
  if (error) throw boom.badRequest(error);

  const { username, password } = value;

  // we check if the username exists in DB, if it does not we throw an error.
  const foundUser = await dbQuery.findUserByUsername(username);
  if (!foundUser) throw boom.badRequest('Invalid Username or Password, please try again');

  // Checking if password is valid
  const pwdIsValid = await bcrypt.compare(password, foundUser.password);
  if (!pwdIsValid) throw boom.badRequest('Invalid Username or Password, please try again');

  // payload will be the data encoded by the JWT, user stores the token in localStorage
  const payload = {
    username: foundUser.username,
    id: foundUser._id
  };

  // Sending the token to the user, with expiry of one hour
  jwt.sign(payload, process.env.SECRET_FOR_TOKEN, {
    expiresIn: 3600 // in seconds, equal to 1 hour
  }, (err, token) => {
    if (err) throw boom.badImplementation('Unable to generate token, please try again');
    return res.status(200).json({ auth: true, token: "Bearer " + token });
  })

}));




module.exports = router;