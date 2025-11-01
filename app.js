// app.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({message: 'Hello from demo-app'});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`demo-app listening on ${port}`);
});

module.exports = app;
