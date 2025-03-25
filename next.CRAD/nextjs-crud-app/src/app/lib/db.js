// lib/db.js
const { Pool } = require('pg');

const db = new Pool({
  connectionString: process.env.DATABASE_URL, // تأكد من أنك قمت بإضافة هذا المتغير في ملف .env
});

module.exports = { db };
