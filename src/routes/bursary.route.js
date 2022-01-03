const express = require('express');
const getBursaryDataByMonth = require('../utils/getBursaryDataByMonth');
const {getData} = require('../utils/getData');
const findMonth = require('../utils/findMonth');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', async (req, res) => {
  const search = req.query.search;

  const month = findMonth(search);

  if (!month) {
    return res.status(400).json({
      success: false,
      message: 'Bad request.',
    });
  }
  try {
    // fetch bursaries for the year 2022
    const url = getBursaryDataByMonth(month);
    const data = await getData(url);
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
});

module.exports = router;

