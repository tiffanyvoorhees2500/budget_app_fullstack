// Load environment variables
require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      success: true,
      time: result.rows[0].now,
    });
  } catch (err) {
    console.error('DB connection error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Budget App API - Backend-Node server is running' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
const shutdown = async () => {
  try {
    console.log('\nShutting down server...');
    await pool.end();
    console.log('PostgreSQL connection pool closed');
    process.exit(0);
  } catch (err) {
    console.error('Error closing PostgreSQL connection pool:', err.message);
    process.exit(1);
  }
};

// Listen for termination signals
process.on('SIGINT', shutdown); // CTRL+C
process.on('SIGTERM', shutdown); // kill command or system shutdown

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
