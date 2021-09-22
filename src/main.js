const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bursary = require('./routes/bursary.route');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));

app.get('/', (_, res) => {
  res.status(200).json({
    hello: 'world',
  });
});
app.use('/bursaries', bursary);

module.exports = app;
