const fs = require("fs");
const path = require("path");

// Elasticsearch client
const client = require("../config/elasticSearchConfig");
const jsonFilePath = path.join(__dirname, "movies.json");

// Function to read and parse the JSON file
function readJsonFile(filePath) {
  try {
    const fileContents = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading or parsing JSON file:", error);
    return null;
  }
}

// Function to bulk index movies into Elasticsearch
async function bulkIndexMovies(movies) {
  if (!movies) return;

  let bulkOps = [];

  for (const movie of movies) {
    bulkOps.push({ index: { _index: "movies", _id: movie.id.toString() } });
    bulkOps.push(movie);

    if (bulkOps.length === 500) {
      await client.bulk({ body: bulkOps });
      bulkOps = [];
    }
  }

  if (bulkOps.length) {
    await client.bulk({ body: bulkOps });
  }

  console.log("Bulk indexing complete");
}

// Main function to handle the bulk indexing process
async function main() {
  const movies = readJsonFile(jsonFilePath);
  await bulkIndexMovies(movies);

  // Optional: Verification step
  // Add any post-indexing verification or logging here if necessary
}

main().catch(console.error);
