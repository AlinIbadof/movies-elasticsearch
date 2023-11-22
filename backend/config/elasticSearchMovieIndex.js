const client = require("./elasticSearchConfig");

async function createMovieIndex() {
  const indexName = "movies";

  try {
    // Check if the index already exists
    const indexExists = await client.indices.exists({ index: indexName });
    if (indexExists) {
      console.log(`Index ${indexName} already exists. Skipping this part.`);
      return;
    }

    // Create an index with the mapping
    await client.indices.create({
      index: indexName,
      body: {
        mappings: {
          properties: {
            id: { type: "keyword" },
            title: { type: "text" },
            year: { type: "integer" },
            cast: {
              type: "text",
              fields: { keyword: { type: "keyword", ignore_above: 256 } },
            },
            genres: { type: "keyword" },
          },
        },
      },
    });

    console.log(`Index ${indexName} created with mapping`);
  } catch (error) {
    console.error("Error creating the index:", error);
  }
}

module.exports = createMovieIndex;
