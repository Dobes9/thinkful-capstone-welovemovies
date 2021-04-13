/* eslint-disable strict */

const knex = require("../db/connection");

function list(is_showing) {
  return knex("movies")
    .select("movies.*")
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join(
            "movies_theaters",
            "movies.movie_id",
            "movies_theaters.movie_id"
          )
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
    });
  // if (is_showing === "true") {
  //   return knex("movies as m")
  //     .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
  //     .select("m.*")
  //     .where({ "mt.is_showing": true });
  // } else {
  //   return knex("movies").select("*");
  // }
}

function read(movie_id) {
  return knex("movies").where({ movie_id }).first();
}

module.exports = {
  list,
  read,
};
