let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let mongoose = require('mongoose');
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
require('./routes').default(app);


// middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));


app.get('/', (req, res) => {
  res.status(200);
  res.send("hello world");
});

app.listen(process.env.PORT);