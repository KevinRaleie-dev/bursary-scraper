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
  const {title, bursaries, links} = await parseResult(response);

  const bursaryList = arrOfBursaryObjects(bursaries, links);

  const data = {
    title,
    bursaryList,
  };

  return data;
}

module.exports = {
  getData,
};
