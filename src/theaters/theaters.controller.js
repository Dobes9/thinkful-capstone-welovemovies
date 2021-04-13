/* eslint-disable strict */

const TheatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const data = await TheatersService.list(req.params.movieId);
  res.json({ data });
  // const { movieId } = req.params;
  // if (movieId) {
  //   res.json({ data: await TheatersService.listAssoc(movieId) });
  // } else {
  //   res.json({ data: await TheatersService.listAll() });
  // }
}

module.exports = {
  list: asyncErrorBoundary(list),
};