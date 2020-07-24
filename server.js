const express = require('express');
const mongodb = require('mongodb');
const uri = 'mongodb+srv://<username>:<password>@<domain>';
const mongoOptions = { useUnifiedTopology: true };
const client = new mongodb.MongoClient(uri, mongoOptions);

const app = express();
app.use(express.json());

client.connect(function () {
  const db = client.db('cinema');

  app.get('/films', function (request, response) {
    response.send('Retrieve all the films');
  });

  app.get('/films/:id', function (request, response) {
    response.send('Retrieve one film');
  });

  app.post('/films', function (request, response) {
    response.send('Create a film');
  });

  app.put('/films/:id', function (request, response) {
    response.send('Update one film');
  });

  app.delete('/films/:id', function (request, response) {
    response.send('Delete one film');
  });

  app.listen(3000);
});
