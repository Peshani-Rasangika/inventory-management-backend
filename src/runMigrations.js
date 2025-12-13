require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { sql, connectDB } = require("./config/db");

const runMigrations = async () => {
  try {
    await connectDB();

    const migrationPath = path.join(__dirname, "../migrations");
    const files = fs.readdirSync(migrationPath);

    for (const file of files) {
      const query = fs.readFileSync(path.join(migrationPath, file), "utf8");
      console.log(`Running migration: ${file}`);
      await sql.query(query);
    }

    console.log("✅ Migrations completed");
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration failed", err);
    process.exit(1);
  }
};

module.exports = runMigrations;
