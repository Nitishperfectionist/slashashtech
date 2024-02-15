// src/App.js

import React, { useState } from 'react';
import { searchJoke } from './services/Api';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [query, setQuery] = useState('');
  const [jokes, setJokes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const results = await searchJoke(query);
    setJokes(results);
  };

  const handleFavorite = (joke) => {
    setFavorites([...favorites, joke]);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Joke Search App</h1>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSearch}>
            <div className="mb-3">
              <label htmlFor="searchInput" className="form-label">Search for Jokes:</label>
              <input
                type="text"
                id="searchInput"
                className="form-control"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
          {jokes.map((joke) => (
            <div key={joke.id} className="card mt-3">
              <img src={joke.icon_url} className="card-img-top" alt="Joke image"/>
              <div className="card-body">
                <p className="card-text">{joke.joke}</p>
                <button
                  className="btn btn-warning"
                  onClick={() => handleFavorite(joke)}
                >
                  Favorite
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-6">
          <h3>Favorites</h3>
          <ul className="list-group">
            {favorites.map((fav, index) => (
              <li key={index} className="list-group-item">{fav.joke}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
