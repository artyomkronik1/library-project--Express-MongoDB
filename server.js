//all express side 

const express = require("express");
const app = express(), PORT = 8080;
const mongoBooks = require('./mongodb_books');

app.use(express.json()); //we will push our data as JSON






//geting to the url /books to see the all books (using the function from mongodb_books.js) GET method 
app.get('/books',(req, res)=>{
    mongoBooks.handleGet(req, res);
} );


//posting our book to the url /books (using func from mongodb_js)to database POST method 
app.post('/books',(req, res)=>{
  mongoBooks.handlePost(req, res);
} );


//deleting our book by id to the url /books (using func from mongodb_js)to database DELETE method 
app.delete('/books/:id',(req, res)=>{
  mongoBooks.handleDelete(req, res);
} );




//updating our book by id to the url /books (using func from mongodb_js)to database PATCH method 
app.patch('/books/:id',(req, res)=>{
  mongoBooks.handleUpdate(req, res);
} );




//istening to the server
app.listen(PORT, ()=>{
  console.log("app is listening on port 8080")
})