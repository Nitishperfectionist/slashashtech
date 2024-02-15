// src/services/api.js

const apiUrl = 'https://icanhazdadjoke.com/';

export const searchJoke = async (query) => {
  const response = await fetch(`${apiUrl}search?term=${query}`, {
    headers: {
      'Accept': 'application/json',
    },
  });
  const data = await response.json();
  return data.results;
};
