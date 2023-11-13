# Movie Search Application

## Overview
The main goal of this project is to let users search for and explore a wide range of movies easily. I aim to combine a React front-end with Vite, a back-end using Node.js and Express.js, and the Elasticsearch search engine. Together, these create a fast and smooth experience for finding movie information quickly.

By indexing a comprehensive collection of movie metadata, the application provides quick access to movie titles, directors, actors, and summaries. It aims to illustrate how modern web technologies can be combined with Elasticsearch to produce scalable and high-performance web applications.

## Technology stack
* Front-end: React.js (created with Vite)
* Back-end: Node.js with Express.js
* Search Engine: Elasticsearch

## Why these technologies?
* React.js: A popular and efficient JavaScript library for building dynamic and responsive user interfaces.
* Vite: An incredibly fast front-end build tool that significantly improves the development experience.
* Node.js with Express.js: A lightweight and flexible server-side platform that makes building APIs quick and easy.
* Elasticsearch: A powerful open-source search and analytics engine that provides fast and relevant search features.

## Rest API Design
For the time being, I'd like to use all of the CRUD operations to describe the REST API: GET, POST, PUT, and DELETE. The project's endpoints will be as follows:

### Search Movies - GET /api/movies/search/{query}
  This request retrieves a list of movies that match the given search query.
  - Path Parameters:
    - `query` (string): the keyword or phrase to search for in the movie titles.
  - Success Response - a JSON array of movies (code 200 OK)
  - Error Response - details about the error (code 500 INTERNAL SERVER ERROR)

### Add a New Movie - POST /api/movies/
  This request should allow the user to add a new movie to the dataset. Depending on the response, output a custom message.
  - Request Body (example):
    ```json
    {
      "title": "Me and Earl and the Dying Girl",
      "director": "Alfonso Gomez-Rejon",
      "year": 2015,
      "genre": ["Comedy", "Drama", "Romance"]
    }
    ```
  - Success Response - a success message (code 201 CREATED)
  - Error Response - details about the error (code 400 BAD REQUEST)

### Update Movie Details - PUT /api/movies/{id}
  This request allows users to update the details of an existing movie.
  - Path Parameters:
    - `id` (string): the unique identifier of the movie to be updated.
  - Request Body should be the same as for the POST.
  - Success Response - a success message (code 200 OK)
  - Error Response - details about the error (code 404 NOT FOUND)

### Delete a Movie - DELETE /api/movies/{id}
  - Description: Deletes a movie from the collection.
  - Path Parameters:
    - `id` (string): the unique identifier of the movie to be deleted.
  - Success Response - a success message (code 200 OK)
  - Error Response - details about the error (code 404 NOT FOUND)

