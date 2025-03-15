const express = require("express");
const { getUrlStats } = require("../controllers/statsController");

const router = express.Router();

router.get("/stats/:shortId", getUrlStats);

module.exports = router;
