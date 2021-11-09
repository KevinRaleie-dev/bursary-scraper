const express = require('express');
const getBursaryDataByMonth = require('../utils/getBursaryDataByMonth');
const {getData} = require('../utils/getData');
const findMonth = require('../utils/findMonth');

// eslint-disable-next-line new-cap
const router = express.Router();

// feature:
// return a list of bursaries for the 2022 year

router.get('/', async (req, res) => {
  const {search} = req.query;

  const month = findMonth(search);

  if (search.split(' ').find((year) => year === '2022')) {
    if (!month) {
      return res.status(400).json({
        success: false,
        message: 'Bad request.',
      });
    }
    try {
      const [, newBursariesUrl] = getBursaryDataByMonth(month);
      const data = await getData(newBursariesUrl);
      return res.status(200).json({
        success: true,
        ...data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong.',
      });
    }
  } else {
    // fetch bursaries for the year 2021
    try {
      const url = getBursaryDataByMonth(month);
      const data = await getData(url[0]);
      return res.status(200).json({
        success: true,
        ...data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'Something went wrong.',
      });
    }
  }
});

module.exports = router;

