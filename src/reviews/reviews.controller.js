/* eslint-disable strict */

const ReviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
// const hasProperties = require("../errors/hasProperties");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function reviewExists(req, res, next) {
  const review = await ReviewsService.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({
    status: 404,
    message: `Review cannot be found.`,
  });
}

// const hasRequiredProperties = hasProperties("score", "content");

/*
function scorePropIsAnInteger(req, res, next) {
  const { score } = req.body.data;
  if (Number.isInteger(score)) {
    return next();
  }
  return next({
    status: 400,
    message: `Score property must be an integer.`,
  });
}
*/

async function destroy(req, res) {
  await ReviewsService.destroy(res.locals.review.review_id);
  res.sendStatus(204);
}

async function list(req, res) {
  const data = await ReviewsService.list(req.params.movieId);
  res.json({ data });
}

/*
function contentPropIsAString(req, res, next) {
  const { content } = req.body.data;
  if (typeof content === "string") {
    return next();
  }
  return next({
    status: 404,
    message: `Content must be a string.`,
  });
}
*/

function hasMovieIdInPath(req, res, next) {
  if (req.params.movieId) {
    return next();
  }
  methodNotAllowed(req, res, next);
}

function noMovieIdInPath(req, res, next) {
  if (req.params.movieId) {
    return methodNotAllowed(req, res, next);
  }
  next();
}

async function update(req, res) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const data = await ReviewsService.update(updatedReview);
  res.json({ data });
}

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};
