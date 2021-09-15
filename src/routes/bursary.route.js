const express = require('express');
const getBursaryDataByMonth = require('../utils/getBursaryDataByMonth');
const getBursaryData = require('../utils/getBursaryData');
const parseResult = require('../utils/parseScrapeResult');
const {arrOfBursaryObjects} = require('../utils/arrOfBursaryObjects');

// eslint-disable-next-line new-cap
const router = express.Router();

// TODO: get the month from the request body, fetch and respond
//  with the bursary data
router.post('/', async (req, res) => {
  const {month} = req.body;

  if (!month) {
    return res.status(404).json({
      success: false,
      message: 'Could not find the bursaries that matched your request.',
    });
  }

  try {
    const url = getBursaryDataByMonth(month);
    const response = await getBursaryData(url);
    const {title, bursaries, alwaysOpen, links} = parseResult(response);

    const bursaryList = arrOfBursaryObjects(bursaries, links);
    const firstTen = bursaryList.slice(3, 13);

    const data = {
      title,
      bursaries: bursaryList,
      alwaysOpen,
      firstTen,
    };

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
});


module.exports = router;

