/**
 * @description This function takes in a string and returns an object
 * @param {string} bursary
 * @return {object} returns a bursary object
 */
function santize(bursary) {
  const text = bursary.split('(').join('').split(')').join('');
  const textArray = text.split(' ');
  const singleBursaryObject = {
    closing: '',
    name: '',
    link: '',
  };

  for (let i = 0; i < textArray.length; i += 1) {
    if (textArray[i] === 'closing:' || textArray[i] === 'Closing:') {
      singleBursaryObject.closing = textArray.slice(i + 1).join(' ');
      textArray.length = i;
      singleBursaryObject.name = textArray.join(' ');
    }
  }

  return {
    ...singleBursaryObject,
  };
}

module.exports = santize;
