const sanitize = require('./santizeData');

/**
 *
 * @param {Array<string>} bursaries
 * @param {Array<string>} urlLinks
 * @return {Array<{}>}
 */
function arrOfBursaryObjects(bursaries, urlLinks) {
  const arrOfObj = [];

  for (const bursary of bursaries) {
    const obj = sanitize(bursary);
    arrOfObj.push(obj);
  }

  for (let i = 0; i < arrOfObj.length; i++) {
    arrOfObj[i].link = urlLinks[i];
  }

  return arrOfObj;
}

module.exports = {
  arrOfBursaryObjects,
};
