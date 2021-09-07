const express = require('express');
const bursary = require('./routes/bursary.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.status(200).json({
    hello: 'world',
  });
});
app.use('/bursaries', bursary);

module.exports = app;
