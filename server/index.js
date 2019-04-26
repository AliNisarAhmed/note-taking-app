const express = require('express');
const bodyParser = require('body-parser');

const connect = require('./connect');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', express.static('dist'));


// Sample API
app.get('/api/data', (req, res) => {
  res.json([
    {
      name: 'Ali',
      age: 31
    },
    {
      name: "Samrah",
      age: 30
    }
  ])
});

// Sample front end routes

app.get('/', (req, res) => {
  res.render(process.cwd() + '/dist/index.html');
});

// Catchall route

app.get('*', (req, res) => {
  res.redirect('/');
});

connect('mongodb://localhost/test-db')
  .then(() => {
    app.listen(3000, () => console.log('Listening on port 3000!'));
  });
