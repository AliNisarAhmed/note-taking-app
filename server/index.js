const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// **** for Connecting to Mongodb via Mongoose ****
const connect = require('./connect');


// **** API Routes ****
const noteRouter = require('./routes/api/notes');
const authRouter = require('./routes/auth/index');

// ================= API =========================

// Auth
// -> /api/auth/register : User can enter username (unique) and password to signup.
// -> /api/auth/login : User logins using username & password

// Notes
// -> POST: /api/notes/create/:userId => User can create a note, only after logging in
// -> DELETE: /api/notes/delete/:noteId => User can delete a note
// -> GET: /api/notes/all/:userId => get all notes for a user
// -> PUT: /

//================================================


// **** APP ****
const app = express();


// **** MIDDLEWARES ****
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static('dist'));
app.use('/api/notes', noteRouter);
app.use('/api/auth', authRouter);


// **** Static File serving Route ****
app.get('/', (req, res) => {
  res.render(process.cwd() + '/dist/index.html');
});

// Catchall route

app.get('/*', (req, res) => {
  res.sendFile(process.cwd() + '/dist/index.html', function(err) {
    if (err) {
      res.status(500).send(err)
    }
  });
});


// **** ERROR HANDLER ****
app.use((err, req, res, next) => {
  if (err.isServer) {
    // log the error...
    console.log(err);
  }
  return res.status(err.output.statusCode).json(err.output.payload);
})

const port = process.env.PORT || 3000;

connect('mongodb://172.17.0.2:27017/test-db')
  .then(() => {
    app.listen(port, () => console.log(`> Listening on port ${port}!`));
  });
