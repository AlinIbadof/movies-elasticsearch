# Movie Search Application

## Demo

...

## Overview

The main goal of this project is to let users search for and explore a wide range of movies easily. I aim to combine a React front-end with Vite, a back-end using Node.js and Express.js, and the Elasticsearch search engine. Together, these create a fast and smooth experience for finding movie information quickly.

By indexing a comprehensive collection of movie metadata, the application provides quick access to movie titles, directors, actors, and summaries. It aims to illustrate how modern web technologies can be combined with Elasticsearch to produce scalable and high-performance web applications.

## Technology stack

- Front-end: React.js (created with Vite)
- Back-end: Node.js with Express.js
- Search Engine: Elasticsearch

## Why these technologies?

- React.js: A popular and efficient JavaScript library for building dynamic and responsive user interfaces.
- Vite: An incredibly fast front-end build tool that significantly improves the development experience.
- Node.js with Express.js: A lightweight and flexible server-side platform that makes building APIs quick and easy.
- Elasticsearch: A powerful open-source search and analytics engine that provides fast and relevant search features.

## Rest API Design

For the time being, I'd like to use all of the CRUD operations to describe the REST API: GET, POST, PUT, and DELETE. The project's endpoints will be as follows:

### Search Movies - GET /api/movie/?searchText=...

This request retrieves a list of movies that match the given search query.

- Path Parameters:
  - `searchText` (string): the keyword or phrase to search for in the movie titles.
- Success Response - a JSON array of movies (code 200 OK)
- Error Response - details about the error (code 500 INTERNAL SERVER ERROR)

### Add a New Movie - POST /api/movie/

This request should allow the user to add a new movie to the dataset. Depending on the response, output a custom message.

- Request Body (example):
  ```json
  {
    "title": "Me and Earl and the Dying Girl",
    "year": 2015,
    "cast": ["Thomas Mann", ...],
    "genres": [ "Comedy", "Drama" ]
  }
  ```
- Success Response - a success message (code 201 CREATED)
- Error Response - details about the error (code 400 BAD REQUEST)

### Update Movie Details - PUT /api/movie/{id}

This request allows users to update the details of an existing movie.

- Path Parameters:
  - `id` (string): the unique identifier of the movie to be updated.
- Request Body should be the same as for the POST.
- Success Response - a success message (code 200 OK)
- Error Response - details about the error (code 404 NOT FOUND)

### Delete a Movie - DELETE /api/movie/{id}

- Description: Deletes a movie from the collection.
- Path Parameters:
  - `id` (string): the unique identifier of the movie to be deleted.
- Success Response - a success message (code 200 OK)
- Error Response - details about the error (code 404 NOT FOUND)

## How to set up and run the application

1. Download ElasticSearch client for windows from the [official website](https://www.elastic.co/downloads/elasticsearch).
2. Extract the ZIP file somewhere.
3. Run `./bin/elasticsearch.bat`. This should open up a command prompt and give you some information on the screen, such as a password. Save the password somewhere for now.
4. Go into the extracted folder. Open up the config directory and the **elasticsearch.yml**. Find up the following section, and modify accordingly.

| original                                                                                         | changed                                                                                         |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| xpack.security.http.ssl: <br> &ensp; enabled: **true** <br> &ensp; keystore.path: certs/http.p12 | xpack.security.http.ssl: <br> &ensp;enabled: **false** <br> &ensp;keystore.path: certs/http.p12 |

5. Clone this repository / download as an archive.
6. Install the node packages, </br>
   6.1. Open up the **"frontend"** directory and run `npm install` </br>
   6.2. Open up the **"backend"** directory and run `npm install` </br>
7. Inside the **"backend"** directory create a new file called **.env**, the content of the file should look like this: `ELASTIC_PASSWORD=put_password_here`. Remember the password i told you to save earlier? Now is the time to paste it in this file.
8. While still in the backend directory, run `./dataset/.insertdata.js`.
9. Now we can start up the Node and Vite servers. </br>
   9.1. Run `node index.js`. </br>
   9.2. Open up the frontend, run `npm run dev`. </br>
   9.3. Access [http://localhost:5173](http://localhost:5173).

**Congratulations, You should now be able to see the application!**
