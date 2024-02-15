// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://nitishkumar2809:" + encodeURIComponent("<r1Nt8KUaziuB4uYI>") +
  "@nitishapis.nitvoii.mongodb.net/NitishApis?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Create a Joke schema
const jokeSchema = new mongoose.Schema({
  joke: String,
});

// Create a Joke model
const Joke = mongoose.model('Joke', jokeSchema);

// API to save favorite joke to MongoDB
app.post('/api/favorites', async (req, res) => {
  try {
    const { joke } = req.body;
    const newJoke = new Joke({ joke });
    await newJoke.save();
    res.status(201).json(newJoke);
  } catch (error) {
    console.error('Error saving to database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API to get all favorite jokes from MongoDB
app.get('/api/favorites', async (req, res) => {
  try {
    const jokes = await Joke.find();
    res.status(200).json(jokes);
  } catch (error) {
    console.error('Error fetching from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
