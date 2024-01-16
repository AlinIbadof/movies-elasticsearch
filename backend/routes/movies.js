const express = require("express");
const router = express.Router();
const movieService = require("../services/movieService");
const { getLastIdFromJsonFile } = require("../utils");

router.get("/search-movie/", async (req, res) => {
  try {
    const { searchText } = req.query;
    const movie = await movieService.searchMovies(searchText);
    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});

router.get("/random-movies", async (req, res) => {
  try {
    const movies = await movieService.getRandomMovies();
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});

router.get("/search-actor/", async (req, res) => {
  try {
    const { actorName, size, page } = req.query;
    const moviesWithActor = await movieService.searchActor(
      actorName,
      size,
      page
    );
    res.json(moviesWithActor);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, year, cast, genres } = req.body;

    const newMovie = {
      id: getLastIdFromJsonFile("./dataset/movies.json") + 1,
      title,
      year,
      cast: cast || [],
      genres: genres || [],
    };

    await movieService.addMovie(newMovie);

    res.json({ success: true, message: "Movie added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});

module.exports = router;
