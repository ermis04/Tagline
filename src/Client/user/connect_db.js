const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // allow CORS so your browser can fetch

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'tagline'
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
console.log('Starting server...');

// DB conneciton

parameters = 'first_name, last_name'
table = 'person'

app.get('/api/persons', (req, res) => {
  connection.query(`SELECT ${parameters} FROM ${table}`, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});