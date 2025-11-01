// app.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  // Simple HTML response with a table
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Way.com Users</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f6f8;
        color: #333;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      table {
        border-collapse: collapse;
        width: 70%;
        background: white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        border-radius: 10px;
        overflow: hidden;
      }
      th, td {
        padding: 12px 20px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }
      th {
        background-color: #007bff;
        color: white;
      }
      tr:hover {
        background-color: #f1f1f1;
      }
      caption {
        font-size: 1.5em;
        margin-bottom: 10px;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <table>
      <caption>User Details - Way.com</caption>
      <thead>
        <tr>
          <th>User Name</th>
          <th>Password</th>
          <th>Email</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Arun</td>
          <td>Way@123</td>
          <td>arun@way.com</td>
          <td>Chennai, India</td>
        </tr>
        <tr>
          <td>John</td>
          <td>Pass@456</td>
          <td>john@way.com</td>
          <td>New York, USA</td>
        </tr>
        <tr>
          <td>Amy</td>
          <td>Amy@789</td>
          <td>amy@way.com</td>
          <td>London, UK</td>
        </tr>
      </tbody>
    </table>
  </body>
  </html>
  `;

  res.send(html);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`demo-app listening on ${port}`);
});

module.exports = app;
