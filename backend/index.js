const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const cors = require("cors");

// Elasticsearch client
const createMovieIndex = require("./config/elasticSearchMovieIndex");
createMovieIndex();

// CORS
app.use(cors());

// Middlewares
app.use(bodyParser.json());

// Routes
const movieRoutes = require("./routes/movies");
app.use("/api/movies", movieRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
