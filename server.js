const express = require('express');
const dotenv = require('dotenv');
const mongodb = require('mongodb');
const uri = process.env.DATABASE_URI
const mongoOptions = { useUnifiedTopology: true };
const client = new mongodb.MongoClient(uri, mongoOptions);

const app = express();
app.use(express.json());
dotenv.config()

client.connect(function () {
  const db = client.db('mongo-week3');
  const collection = db.collection("movies")

  app.get('/films', function (request, response) {
    collection.find().toArray(function(error, films){
      if (error) {
        response.status(500).send(error)
      } else {
        response.status(200).send(films)
      }
    })
  });

  app.get('/films/:id', function (request, response) {
    let id;
    let checkID = request.params.id

    if (mongodb.ObjectId.isValid(checkID)) {
      id = new mongodb.ObjectId(checkID)
    } else {
      response.status(400).send("This ID is invalid")
    }

    const searchId = {_id: id}

    collection.findOne(searchId, function(error, result) {
      if (error){
        response.status(500).send("Error")
      } else if(!result){
        response.status(404).send("Movie not found!")
      } else {
        response.send(result)
      }
    })
  });

  app.post('/films', function (request, response) {
    const newObject = {
      title: request.body.title,
      year: Number(request.body.year)
    }

    collection.insertOne(newObject, function(error, result){
      if (error){
        response.status(500)
      } else {
        response.send(result.ops[0])
      }
    })
  });

  app.put('/films/:id', function (request, response) {
    response.send('Update one film');
  });

  app.delete('/films/:id', function (request, response) {
    response.send('Delete one film');
  });

  app.listen(3000);
});
