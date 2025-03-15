const pool = require("../config/db");
const { nanoid } = require("nanoid");
const validator = require("validator");

exports.shortenUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;
    if (!longUrl) {
      return res.status(400).json({ error: "Missing longUrl parameter" });
    }

    if (!validator.isURL(longUrl, { require_protocol: true })) {
      return res.status(400).json({ error: "Invalid URL format. Please provide a valid URL with 'http://' or 'https://'" });
    }
    const existing = await pool.query("SELECT short_id FROM urls WHERE long_url = $1", [longUrl]);
    if (existing.rows.length > 0) {
      return res.json({ shortUrl: `${req.protocol}://${req.get("host")}/${existing.rows[0].short_id}`,shortId:existing.rows[0].short_id });
    }

    const shortId = nanoid(7);
    await pool.query("INSERT INTO urls (short_id, long_url) VALUES ($1, $2)", [shortId, longUrl]);

    res.json({ shortUrl: `${req.protocol}://${req.get("host")}/${shortId}` ,shortId});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;
    const result = await pool.query("SELECT long_url FROM urls WHERE short_id = $1", [shortId]);

    if (result.rows.length > 0) {
      const longUrl = result.rows[0].long_url;
      await pool.query("INSERT INTO url_visits (short_id) VALUES ($1)", [shortId]);
      res.redirect(longUrl);
    } else {
      res.status(404).json({ error: "URL not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
 