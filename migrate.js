const fs = require("fs");
const pool = require("./config/db");

async function runMigration() {
  try {
    const sql = fs.readFileSync("migrations/init.sql", "utf8");
    await pool.query(sql);
    console.log("✅ Tables created successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

runMigration();
