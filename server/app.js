require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const configure = require('./config/passport.js');
const cors = require('cors');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

// Mongoose
mongoose.connect(process.env.DBURL, {useNewUrlParser: true})
.then(connection => {
  console.log('Connected to MongoDB!');
})


// Sessions
app.use(session({
  secret: "imasecret",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// CORS Stuff
const whitelist = [
  'http://localhost:4200',
]

const corsOptions = {
  origin: (origin, cb) => {
    var originIsWhiteListed = whitelist.indexOf(origin) !== -1;
    cb(null, originIsWhiteListed);
  },
  credentials: true
}

app.use(cors(corsOptions))

// Passport
configure(passport);
app.use(passport.initialize());
app.use(passport.session());

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// URLs
app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(500).json({
    message: err.message
  });
});

module.exports = app;