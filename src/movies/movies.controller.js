const MoviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const movie = await MoviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({
    status: 404,
    message: `Movie cannot be found.`,
  });
}

function read(req, res, next) {
  res.json({ data: res.locals.movie });
}

async function list(req, res, next) {
  const data = await MoviesService.list(req.query.is_showing);
  res.json({ data });

  // const { is_showing } = req.query;
  // if (!is_showing) {
  //   res.json({ data: await MoviesService.list() });
  // } else if (is_showing === "true") {
  //   res.json({ data: await MoviesService.list(is_showing) });
  // }
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  movieExists,
};
