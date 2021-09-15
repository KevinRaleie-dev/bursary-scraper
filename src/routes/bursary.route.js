const express = require('express');
const getBursaryDataByMonth = require('../utils/getBursaryDataByMonth');
const getBursaryData = require('../utils/getBursaryData');
const parseResult = require('../utils/parseScrapeResult');
const findMonth = require('../utils/findMonth');
const {arrOfBursaryObjects} = require('../utils/arrOfBursaryObjects');

// eslint-disable-next-line new-cap
const router = express.Router();

// TODO: get the month from the request body, fetch and respond
//  with the bursary data
router.get('/', async (req, res) => {
  const {searchText} = req.query;

  const month = findMonth(searchText);

  if (!month) {
    return res.status(400).json({
      success: false,
      message: 'Bad request.',
    });
  }

  try {
    const url = getBursaryDataByMonth(month);
    const response = await getBursaryData(url);
    const {title, bursaries, alwaysOpen, links} = await parseResult(response);

    const bursaryList = arrOfBursaryObjects(bursaries, links);
    const firstTen = bursaryList.slice(3, 13);

    const data = {
      title,
      bursaryList,
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

