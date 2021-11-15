/**
 * @description This function takes in a string and returns an object
 * @param {string} bursary
 * @return {object} returns a bursary object
 */
function santize(bursary) {
  const title = separator(bursary);
  const titleArray = title.split(' ');
  const bursaryObject = {
    closing: '',
    name: '',
    link: '',
  };

  for (const index in titleArray) {
    if (titleArray[index] === 'closing:' || titleArray[index] === 'Closing:') {
      bursaryObject.closing = titleArray.slice(index + 1).join(' ');
      titleArray.length = index;
      bursaryObject.name = titleArray.join(' ');
    }
  }

  return {
    ...bursaryObject,
  };
}

/**
 *
 * @param {string} bursary
 * @return {string}
 */
function separator(bursary) {
  return bursary.split('(').join('').split(')').join('');
}

module.exports = santize;
