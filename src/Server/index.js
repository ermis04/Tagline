const express = require("express");
const path = require("path");
const db = require("./db");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.static(path.join(__dirname, "../Client")));

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
