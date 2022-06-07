//all mongo db side

const mongodb = require("mongodb");
const booksCollection='books';
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017/"; //local mongo
const my_db = 'my_library';


//UPDATING book by his id --> sending to server a new book
function handleUpdate(req,res)
{
  MongoClient.connect(url, function(err, db) {
    if (err)
    {
      return res.sendStatus(500);
    }  
    let dbo = db.db(my_db);
    let myquery = { _id: new mongodb.ObjectId(req.params.id)}; //book we want to update
    let bookObjToUpdate = req.body; // new book 
    let newvalues = { $set: bookObjToUpdate };
    dbo.collection(booksCollection).updateOne(myquery, newvalues, function(err, resulst) {
      if (err)
      {
        return res.sendStatus(500);
      }  
      console.log(resulst);
      res.sendStatus(200);
      db.close();
    });
  });
}


//deleting book by his id
function handleDelete(req,res)
{
  MongoClient.connect(url, function(err, db) {
    if (err)
    {
      return res.sendStatus(500);
    }  
      let dbo = db.db(my_db);
    let myquery = { _id: new mongodb.ObjectId(req.params.id)};
    dbo.collection(booksCollection).deleteOne(myquery, function(err, result) {
      if (err)
      {
        return res.sendStatus(500);
      }    
      
      console.log(result);
      res.sendStatus(200);
      db.close();
    });
  });
}





//posting our book to database POST method 
function handlePost(req,res)
{
  MongoClient.connect(url, function(err, db) {
    if (err)
    {
      return res.sendStatus(500);
    }
    let dbo = db.db(my_db); //our db
    let bookObj = req.body; //our object we want to post
    dbo.collection(booksCollection).insertOne(bookObj, function(err, resultfromMongo) {
      if (err)
      {
        return res.sendStatus(500);
      }
      res.sendStatus(201);
      console.log(resultfromMongo); //gewtting result from mongo -our book we pushed before
      db.close();
    });
  });

}




//geting to the url /books to see the all books GET method
function handleGet(req,res)
{
  MongoClient.connect(url, function(err, db) {
    if (err)
    {
      return res.sendStatus(500);
    }
    let dbo = db.db(my_db); //my db
    //finding the data
    dbo.collection(booksCollection).find({}).toArray(function(err, books) {
      if (err)
      {
        return res.sendStatus(500);
      } 
      return res.send(books);
      db.close();
    });
  });
}
module.exports.handleGet = handleGet;
module.exports.handlePost = handlePost;
module.exports.handleDelete = handleDelete;
module.exports.handleUpdate = handleUpdate;