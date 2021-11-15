const sanitize = require('./santizeData');

/**
 *
 * @param {Array<string>} bursaries
 * @param {Array<string>} urlLinks
 * @return {Array<{}>} an array of bursary objects
 */
function arrOfBursaryObjects(bursaries, urlLinks) {
  const bursaryObjectArray = [];

  for (const bursary of bursaries) {
    const obj = sanitize(bursary);
    bursaryObjectArray.push(obj);
  }

  // eslint-disable-next-line guard-for-in
  for (const index in bursaryObjectArray) {
    bursaryObjectArray[index].link = urlLinks[index];
  }

  return bursaryObjectArray;
}

module.exports = {
  arrOfBursaryObjects,
};
