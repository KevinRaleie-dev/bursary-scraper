const express = require('express');
const getBursaryDataByMonth = require('../utils/getBursaryDataByMonth');
const getBursaryData = require('../utils/getBursaryData');
const parseResult = require('../utils/parseScrapeResult');

// eslint-disable-next-line new-cap
const router = express.Router();

// TODO: get the month from the request body, fetch and respond
//  with the bursary data
router.post('/bursaries', async (req, res) => {
  const {month} = req.body;

  if (!month) {
    return res.statusCode(404).json({
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

    return res.statusCode(200).json({
      success: true,
      ...data,
    });
  } catch (error) {
    return res.statusCode(500).json({
      success: false,
      message: error.message,
    });
  }
});


module.exports = router;

