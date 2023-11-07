# Movie Search Application

## Overview
The main goal of this project is to let users search for and explore a wide range of movies easily. We aim to combine a React front-end with Vite, a back-end using Node.js and Express.js, and the Elasticsearch search engine. Together, these create a fast and smooth experience for finding movie information quickly.

By indexing a comprehensive collection of movie metadata, the application provides quick access to movie titles, directors, actors, and summaries. It aims to illustrate how modern web technologies can be combined with Elasticsearch to produce scalable and high-performance web applications, serving as a practical reference for developers interested in search engine implementation.

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
Initially, there will be only one endpoint, the GET request for searching movies: GET /api/search/{query}. <br />
This request will be responsible to retrieve a list of movies that match the given search query, in this case being the movie title.

