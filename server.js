// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/library', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Book = mongoose.model('Book', {
  title: String,
  author: String,
  ISBN: String,
  available: Boolean
});

app.post('/api/books', async (req, res) => {
  const { title, author, ISBN } = req.body;
  const book = new Book({ title, author, ISBN, available: true });
  try {
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
