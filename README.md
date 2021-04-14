# Thinkful Capstone Project - WeLoveMovies
#### Capstone project with Thinkful Engineering Immersion. 

This assignment focuses on our ability to create a backend server, and connect it with a cloud based database.  We were tasked to write API endpoints for the following routes:

### GET /movies
For this route, the server should respond with a list of every movie in the database, with the following information:

```
{
  "data": [
    {
      "id": 1,
      "title": "Spirited Away",
      "runtime_in_minutes": 125,
      "rating": "PG",
      "description": "Chihiro ...",
      "image_url": "https://imdb-api.com/..."
    }
    // ...
  ]
}
```
If the query is_showing=true is provided, this route will instead show a list of all movies that are currently showing, according to the movies_theaters table.

### GET /movies/:movieId
For this route, the server will respond with the data for one particular movie, based on the movie's id.

```
{
  "data": {
    "id": 1,
    "title": "Spirited Away",
    "runtime_in_minutes": 125,
    "rating": "PG",
    "description": "Chihiro...",
    "image_url": "https://imdb-api.com/..."
  }
}
```
### GET /movies/:movieId/theaters
This route references both theaters and movies_theaters, in order to return a list of all the theaters showing the selected movie, with the following information:

```
{
  "data": [
    {
      "theater_id": 2,
      "name": "Hollywood Theatre",
      "address_line_1": "4122 NE Sandy Blvd.",
      "address_line_2": "",
      "city": "Portland",
      "state": "OR",
      "zip": "97212",
      "created_at": "2021-02-23T20:48:13.342Z",
      "updated_at": "2021-02-23T20:48:13.342Z",
      "is_showing": true,
      "movie_id": 1
    }
    // ...
  ]
}
```
Additionally, this route requires us to use a nested route, mounting the theaters router on the movies router.

### GET /movies/:movieId/reviews
For this route, the server should respond with a list of all reviews of the selected movie, with the following information:

```
{
  "data": [
    {
      "review_id": 1,
      "content": "Lorem markdownum ...",
      "score": 3,
      "created_at": "2021-02-23T20:48:13.315Z",
      "updated_at": "2021-02-23T20:48:13.315Z",
      "critic_id": 1,
      "movie_id": 1,
      "critic": {
        "critic_id": 1,
        "preferred_name": "Chana",
        "surname": "Gibson",
        "organization_name": "Film Frenzy",
        "created_at": "2021-02-23T20:48:13.308Z",
        "updated_at": "2021-02-23T20:48:13.308Z"
      }
    }
    // ...
  ]
}
```
Additionally, this route makes use of a nested route, mounting the reviews router on the movies router.  The response generated from Knex also requires us to
create a critic key, containing all of the associated critic information, requiring us to join the reviews and critics tables.

### DELETE /reviews/:reviewId
This route will delete a review in the database by its id, if the review exists.

### PUT /reivews/:reviewId
Ths route will update a review in the database by its id, if the review exists.  The request body should have the following properties:
```
{
  "score": 3,
  "content": "New content..."
}
```
When the server successfully updates a review, it should respond with the following response:

```
{
  "data": {
    "review_id": 1,
    "content": "New content...",
    "score": 3,
    "created_at": "2021-02-23T20:48:13.315Z",
    "updated_at": "2021-02-23T20:48:13.315Z",
    "critic_id": 1,
    "movie_id": 1,
    "critic": {
      "critic_id": 1,
      "preferred_name": "Chana",
      "surname": "Gibson",
      "organization_name": "Film Frenzy",
      "created_at": "2021-02-23T20:48:13.308Z",
      "updated_at": "2021-02-23T20:48:13.308Z"
    }
  }
}
```

### GET /theaters
For this route, the server will respond with a list of all theaters, as well as every movie associated with that theater (regardless of whether it is currently playing there). This route requires a join between the movies, theaters, and movies_theaters tables. It also requires a movies key, to list all of the movies
associated with the theater.  The response will look like:

```

  "data": [
    {
      "theater_id": 1,
      "name": "Regal City Center",
      "address_line_1": "801 C St.",
      "address_line_2": "",
      "city": "Vancouver",
      "state": "WA",
      "zip": "98660",
      "created_at": "2021-02-23T20:48:13.335Z",
      "updated_at": "2021-02-23T20:48:13.335Z",
      "movies": [
        {
          "movie_id": 1,
          "title": "Spirited Away",
          "runtime_in_minutes": 125,
          "rating": "PG",
          "description": "Chihiro...",
          "image_url": "https://imdb-api.com...",
          "created_at": "2021-02-23T20:48:13.342Z",
          "updated_at": "2021-02-23T20:48:13.342Z",
          "is_showing": false,
          "theater_id": 1
        }
        // ...
      ]
    }
    // ...
  ]
}
```

All necessary validation functions and error handlers are also included in project.

## Technology
#### Built with:
  * Node.js, Express, PostgreSQL, Knex, CORS.
  
