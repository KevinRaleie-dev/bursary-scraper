const express = require('express');
const getBursaryDataByMonth = require('../utils/getBursaryDataByMonth');
const getBursaryData = require('../utils/getBursaryData');
const parseResult = require('../utils/parseScrapeResult');

// eslint-disable-next-line new-cap
const router = express.Router();

// TODO: get the month from the request body, fetch and respond
//  with the bursary data
router.post('/', async (req, res) => {
  const {month} = req.body;

  if (!month) {
    return res.status(404).json({
      success: false,
      message: 'Please enter a valid month, bursary month cannot be empty.',
    });
  }

  try {
    const url = getBursaryDataByMonth(month);
    const response = await getBursaryData(url);
    const {alwaysOpen, bursaries, title} = parseResult(response);

    const firstTen = bursaries.slice(3, 13);

    const data = {
      title,
      bursaries,
      alwaysOpen,
      firstTen,
    };

    return res.status(200).json({
      success: true,
      ...data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


module.exports = router;

