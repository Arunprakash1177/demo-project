const express = require('express');
const bodyParser = require('body-parser');
const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

/* =========================
   LOGIN CREDENTIALS
========================= */
const USERNAME = "admin";
const PASSWORD = "way@123";

/* =========================
   LOGIN PAGE
========================= */
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Login - sooryodayam.shop</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-image: url('/images/car.jpg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .login-container {
      background: rgba(255,255,255,0.95);
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      width: 350px;
      text-align: center;
    }
    h2 {
      color: #007bff;
    }
    input {
      width: 90%;
      padding: 10px;
      margin: 10px 0;
      border-radius: 8px;
      border: 1px solid #ccc;
    }
    button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 25px;
      border-radius: 8px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    .error {
      color: red;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="login-container">
    <h2>Login to sooryodayam.shop</h2>
    <form method="POST" action="/login">
      <input type="text" name="username" placeholder="Username" required>
      <input type="password" name="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
    ${req.query.error ? `<p class="error">Invalid credentials</p>` : ``}
  </div>
</body>
</html>
`);
});

/* =========================
   LOGIN HANDLER
========================= */
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USERNAME && password === PASSWORD) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/?error=true');
  }
});

/* =========================
   DASHBOARD
========================= */
app.get('/dashboard', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Dashboard - Sooryodayam.shop</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-image: url('/images/buddha.jpg');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    table {
      width: 75%;
      background: rgba(255,255,255,0.92);
      border-collapse: collapse;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    }
    caption {
      font-size: 1.5em;
      font-weight: bold;
      padding: 15px;
      background: #007bff;
      color: white;
    }
    th, td {
      padding: 14px 20px;
      border-bottom: 1px solid #ddd;
      text-align: left;
    }
    th {
      background: #f1f1f1;
    }
    tr:hover {
      background: #f9f9f9;
    }
  </style>
</head>
<body>
  <table>
    <caption>User Details - Sooryodayam.shop</caption>
    <thead>
      <tr>
        <th>User Name</th>
        <th>Password</th>
        <th>Email</th>
        <th>Address</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Arunprakash</td><td>Way@123</td><td>arun@sooryodayam.shop</td><td>Chennai, India</td></tr>
      <tr><td>sujith</td><td>Pass@456</td><td>sujith@sooryodayam.shop</td><td>New York, USA</td></tr>
      <tr><td>Aravind</td><td>wrvjn</td><td>aravind@sooryodayam.shop</td><td>London, UK</td></tr>
    </tbody>
  </table>
</body>
</html>
`);
});

/* =========================
   SERVER
========================= */
const port = 3000;
app.listen(port, () => {
  console.log(`Way Dashboard running on http://localhost:${port}`);
});
