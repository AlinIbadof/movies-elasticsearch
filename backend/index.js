const express = require("express");
const bodyParser = require("body-parser");
const searchRoutes = require("./routes/searchRoutes");

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use("/api/search", searchRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
