const pool = require("../config/db");

exports.getUrlStats = async (req, res) => {
  try {
    const { shortId } = req.params;

    const result = await pool.query(
      `SELECT 
        COUNT(*) AS total_visits, 
        COUNT(*) FILTER (WHERE visited_at >= NOW() - INTERVAL '1 day') AS today,
        COUNT(*) FILTER (WHERE visited_at >= NOW() - INTERVAL '7 days') AS this_week,
        COUNT(*) FILTER (WHERE visited_at >= NOW() - INTERVAL '1 month') AS this_month
      FROM url_visits WHERE short_id = $1`,
      [shortId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
