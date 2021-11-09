const getBursaryData = require('../utils/getBursaryData');
const parseResult = require('../utils/parseScrapeResult');
const {arrOfBursaryObjects} = require('../utils/arrOfBursaryObjects');
/**
 *
 * @param {string} url
 * @return {Promise<object>} a data object
 */
async function getData(url) {
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

  return data;
}

module.exports = {
  getData,
};
