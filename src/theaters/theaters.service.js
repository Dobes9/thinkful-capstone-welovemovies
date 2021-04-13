/* eslint-disable strict */

const knex = require("../db/connection");
//const mapProperties = require("../utils/map-properties");

async function list(movie_id) {
  return knex("theaters")
    .modify((queryBuilder) => {
      if (movie_id) {
        queryBuilder
          .join("movies_theaters", "movies_theaters.theater_id", "theaters.theater_id")
          .where({ "movies_theaters.movie_id": movie_id });
      }
    })
    .then((theaters) => {
      if (movie_id) {
        return theaters;
      }
      return Promise.all(theaters.map(setMovies));
    });
}

async function setMovies(theater) {
  theater.movies = await knex("movies")
    .join("movies_theaters", "movies_theaters.movie_id", "movies.movie_id")
    .where({ "movies_theaters.theater_id": theater.theater_id });
  return theater;
}

// const addMovies = mapProperties({
//   movie_id: "movie.id",
//   title: "movie.title",
//   runtime_in_minutes: "movie.runtime_in_minutes",
//   rating: "moving.rating",
//   description: "movie.description",
//   image_url: "movie.image_url",
//   created_at: "movie.created_at",
//   updated_at: "movie.updated_at",
//   is_showing: "movie_theater.is_showing",
//   theater_id: "movie_theater.theater_id",
// });

// function listAssoc(movieId) {
//   return knex("theaters as t")
//     .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
//     .select("t.*", "mt.movie_id")
//     .where({ "mt.movie_id": movieId });
// }

module.exports = {
  list,
};