const sanitize = require('./santizeData');

/**
 *
 * @param {Array<string>} arr
 * @return {Array<{}>}
 */
function arrOfBursaryObjects(arr) {
  const arrOfObj = [];

  for (let i = 0; i < arr.length; i++) {
    const obj = sanitize(arr[i]);
    arrOfObj.push(obj);
  }

  return arrOfObj;
}

module.exports = {
  arrOfBursaryObjects,
};
