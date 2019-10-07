let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let mongoose = require('mongoose');
// let http = require('http');
require('dotenv').config();

// mongodb connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('error', (error) => {
  console.error("Something went wrong!", error);
  process.exit(-1);
});

var app = express();
// var server = http.createServer(app);

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

require('./routes').default(app);

// app = server.listen(process.env.PORT);

module.exports = app;