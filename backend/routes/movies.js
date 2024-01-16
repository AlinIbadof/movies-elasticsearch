const express = require("express");
const router = express.Router();
const movieService = require("../services/movieService");
const { getLastIdFromJsonFile } = require("../utils");

router.get("/movie", async (req, res) => {
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

router.post("/movie", async (req, res) => {
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

router.delete("/movie", async (req, res) => {
  try {
    const { title, year } = req.body;
    await movieService.deleteMovieByNameAndYear(title, year);
    res.json({ success: true, message: "Movie deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});

router.put("/movie", async (req, res) => {
  try {
    const { title, newTitle, year, cast, genres } = req.body;
    const existingMovie = await movieService.searchMovies(title);

    const updatedMovie = { title, newTitle, year, cast, genres };

    if (!existingMovie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found." });
    }

    await movieService.updateMovie(updatedMovie);

    res.json({ success: true, message: "Movie updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});

module.exports = router;
