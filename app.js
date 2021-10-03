const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();
const PORT = 3004
const dbURI = process.env.CONNECTION_URL;
console.log(dbURI)
// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

// database connection

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
      console.log(`listening on ${PORT}`)
      app.listen(PORT)})
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);