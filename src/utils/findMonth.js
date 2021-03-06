const {sampleMonths} = require('../constants/mod');
/**
 *
 * @param {string} searchText
 * @return {string} returns the month from the searchText
 */
function findMonth(searchText) {
  const myMonthSet = new Set();
  let month = '';
  const words = searchText.toLowerCase().trim();
  const searchWords = words.split(' ');
  for (let i = 0; i < sampleMonths.length; i += 1) {
    myMonthSet.add(sampleMonths[i]);
  }
  for (let i = 0; i < searchWords.length; i += 1) {
    if (myMonthSet.has(searchWords[i])) {
      month = searchWords[i];
    }
  }
  return month;
}

module.exports = findMonth;
