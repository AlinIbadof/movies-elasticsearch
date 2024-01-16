const fs = require("fs");

function getLastIdFromJsonFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const movies = JSON.parse(data);

    if (movies.length === 0) {
      return 0; // No movies in the file yet
    }

    const lastId = Math.max(...movies.map((movie) => movie.id));
    return lastId;
  } catch (error) {
    console.error(`Error reading JSON file ${filePath}:`, error);
    throw error;
  }
}

module.exports = {
  getLastIdFromJsonFile,
};
