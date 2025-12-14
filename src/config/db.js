const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_SERVER:", process.env.DB_SERVER);
console.log("DB_NAME:", process.env.DB_NAME);
const connectDB = async () => {
  try {
    await sql.connect(config);
    console.log("Connected to Azure SQL Database");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

module.exports = { sql, connectDB };
