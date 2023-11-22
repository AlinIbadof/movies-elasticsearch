const client = require("../config/elasticSearchConfig");

async function searchMovies(searchText) {
  try {
    const result = await client.search({
      index: "movies",
      query: {
        match: {
          title: searchText,
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

module.exports = {
  searchMovies,
  getRandomMovies,
};
