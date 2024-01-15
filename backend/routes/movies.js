const express = require("express");
const router = express.Router();
const movieService = require("../services/movieService");

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

module.exports = router;
