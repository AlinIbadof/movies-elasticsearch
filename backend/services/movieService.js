const client = require("../config/elasticSearchConfig");

async function searchMovies(searchText) {
  try {
    const result = await client.search({
      index: "movies",
      query: {
        match: {
          title: {
            query: searchText,
            fuzziness: "AUTO",
          },
        },
      },
    });

    return result.hits.hits.length > 0 ? result.hits.hits[0]._source : {};
  } catch (error) {
    console.error("Error in searchMovies service:", error);
    throw error;
  }
}

async function getRandomMovies() {
  try {
    const result = await client.search({
      index: "movies",
      body: {
        query: {
          function_score: {
            query: { match_all: {} },
            functions: [{ random_score: {} }],
            boost_mode: "replace",
          },
        },
        size: 10,
      },
    });

    return result.hits.hits.map((hit) => hit._source);
  } catch (error) {
    console.error("Error in getRandomMovies service:", error);
    throw error;
  }
}

async function searchActor(actorName, size) {
  try {
    const result = await client.search({
      index: "movies",
      body: {
        query: {
          match_phrase: {
            cast: actorName,
          },
        },
        size: size,
        sort: [{ year: { order: "desc" } }],
      },
    });

    return result.hits.hits.map((hit) => hit._source);
  } catch (error) {
    console.error("Error in searchActor service:", error);
    throw error;
  }
}

async function addMovie(movie) {
  try {
    const result = await client.index({
      index: "movies",
      body: movie,
    });

    return result.id;
  } catch (error) {
    console.error("Error in addMovie service:", error);
    throw error;
  }
}

async function deleteMovieByNameAndYear(title, year) {
  try {
    let result;
    if (year === "") {
      result = await client.search({
        index: "movies",
        body: {
          query: {
            bool: {
              must: [{ match: { title } }],
            },
          },
        },
      });
    } else {
      result = await client.search({
        index: "movies",
        body: {
          query: {
            bool: {
              must: [{ match: { title } }, { match: { year } }],
            },
          },
        },
      });
    }

    const hits = result.hits.hits;

    if (hits.length === 0) {
      throw new Error("Movie not found.");
    }

    const movieId = hits[0]._id;
    await client.delete({ index: "movies", id: movieId });
  } catch (error) {
    console.error("Error in deleteMovieByNameAndYear service:", error);
    throw error;
  }
}

async function updateMovie(updatedMovie) {
  try {
    const { title, newTitle, year, cast, genres } = updatedMovie;

    const result = await client.search({
      index: "movies",
      body: {
        query: {
          bool: {
            must: [{ match: { title } }],
          },
        },
      },
    });

    const hits = result.hits.hits;

    if (hits.length === 0) {
      throw new Error("Movie not found.");
    }

    const movieId = hits[0]._id;
    const updatedTitle = newTitle !== "" ? newTitle : title;
    const updatedYear = year !== "" ? year : new Date().getFullYear();

    const updatedCast = cast !== "" ? cast : [];
    const updatedGenres = genres !== "" ? genres : [];

    const response = await client.update({
      index: "movies",
      id: movieId,
      body: {
        doc: {
          title: updatedTitle,
          year: updatedYear,
          cast: updatedCast,
          genres: updatedGenres,
        },
      },
    });

    console.log(`Movie updated successfully: ${JSON.stringify(response)}`);
  } catch (error) {
    console.error("Error in updateMovie service:", error);
    throw error;
  }
}

module.exports = {
  searchMovies,
  searchActor,
  getRandomMovies,
  addMovie,
  deleteMovieByNameAndYear,
  updateMovie,
};
