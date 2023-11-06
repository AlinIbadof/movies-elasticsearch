const express = require("express");
const searchService = require("../services/searchService");
const router = express.Router();

router.get("/:query", async (req, res) => {
  try {
    const { query } = req.params;
    const results = await searchService.search(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
