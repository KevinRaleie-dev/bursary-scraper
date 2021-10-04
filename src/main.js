const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const bursary = require('./routes/bursary.route');

const app = express();

app.use(cors({
  origin: 'https://bursary-findr.netlify.app',
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));

app.use(rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
}));

app.get('/', (_, res) => {
  res.status(200).json({
    hello: 'world',
  });
});
app.use('/bursaries', bursary);

module.exports = app;
