const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

dotenv.config();
const app = express();
const PORT = 3001
const dbURI = process.env.CONNECTION_URL;
console.log(dbURI)

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
      console.log(`listening on ${PORT}`)
      app.listen(PORT)})
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

// app.get('/set-cookies', (req, res) => {
//   // res.setHeader('Set-Cookie', 'newUser=true')
//   res.cookie('newUser', false);
//   res.cookie('isEmployee', true, {maxAge: 1000* 60 * 60 * 24, httpOnly: true})
//   res.send('you got the cookies');
// })

// app.get('/read-cookies', (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies)

//   res.json(cookies)
// })