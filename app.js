// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse POST form data
app.use(bodyParser.urlencoded({ extended: true }));

// Simple in-memory login (replace with DB later if needed)
const USERNAME = "admin";
const PASSWORD = "way@123";

// Login Page
app.get('/', (req, res) => {
  const loginPage = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Login - Way.com</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f0f2f5;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      .login-container {
        background: white;
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        width: 350px;
        text-align: center;
      }
      h2 {
        color: #007bff;
        margin-bottom: 20px;
      }
      input[type=text], input[type=password] {
        width: 90%;
        padding: 10px;
        margin: 8px 0;
        border: 1px solid #ccc;
        border-radius: 8px;
      }
      button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        margin-top: 10px;
      }
      button:hover {
        background-color: #0056b3;
      }
      .error {
        color: red;
        font-size: 0.9em;
      }
    </style>
  </head>
  <body>
    <div class="login-container">
      <h2>Login to Way.com</h2>
      <form method="POST" action="/login">
        <input type="text" name="username" placeholder="Username" required><br>
        <input type="password" name="password" placeholder="Password" required><br>
        <button type="submit">Login</button>
      </form>
      ${req.query.error ? `<p class="error">Invalid credentials</p>` : ""}
    </div>
  </body>
  </html>
  `;
  res.send(loginPage);
});

// Handle login POST
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === USERNAME && password === PASSWORD) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/?error=true');
  }
});

// Dashboard (after login)
app.get('/dashboard', (req, res) => {
  const dashboard = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Dashboard - Way.com</title>
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
        <tr><td>Arun</td><td>Way@123</td><td>arun@way.com</td><td>Chennai, India</td></tr>
        <tr><td>John</td><td>Pass@456</td><td>john@way.com</td><td>New York, USA</td></tr>
        <tr><td>Amy</td><td>Amy@789</td><td>amy@way.com</td><td>London, UK</td></tr>
      </tbody>
    </table>
  </body>
  </html>
  `;
  res.send(dashboard);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`demo-app listening on ${port}`);
});

module.exports = app;
