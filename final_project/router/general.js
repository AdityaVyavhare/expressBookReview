const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
const public_users = express.Router();

// Get all books using async/await
public_users.get('/', async function (req, res) {
  try {
    const response = await axios.get('http://localhost:5000/');
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({message: "Error retrieving books"});
  }
});

// Get book by ISBN using Promises
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  axios.get(`http://localhost:5000/isbn/${isbn}`)
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(error => {
      res.status(500).json({message: "Error retrieving book by ISBN"});
    });
});

// Get books by Author using async/await
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;

  try {
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({message: "Error retrieving books by author"});
  }
});

// Get books by Title using Promises
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;

  axios.get(`http://localhost:5000/title/${title}`)
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(error => {
      res.status(500).json({message: "Error retrieving books by title"});
    });
});

module.exports.general = public_users;
