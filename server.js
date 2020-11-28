const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();
app.use(express.json());
app.use(cors());

const saltRounds = 10;

//knex database object
const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'nosteratu69',
    database: 'face-detect',
  },
});

//sign in post request
app.post('/signin', signin.handleSignIn(db, bcrypt));

//register post request
app.post('/register', register.handleRegister(db, bcrypt, saltRounds));

//profile get request
app.get('/profile/:id', profile.handleProfile(db));

//images scanned counter increment put request
app.put('/image', image.handleImage(db));

app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res);
});

//localhost port
app.listen(3000, () => {
  console.log('app is running on port 3000');
});
