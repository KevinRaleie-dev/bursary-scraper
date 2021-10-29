/**
 * @description This function takes in a string and returns an object
 * @param {string} bursary
 * @return {object} returns a bursary object
 */
function santize(bursary) {
  const text = bursary.split('(').join('').split(')').join('');
  const textArray = text.split(' ');
  const bursaryObject = {
    closing: '',
    name: '',
    link: '',
  };

  for (let i = 0; i < textArray.length; i += 1) {
    if (textArray[i] === 'closing:' || textArray[i] === 'Closing:') {
      bursaryObject.closing = textArray.slice(i + 1).join(' ');
      textArray.length = i;
      bursaryObject.name = textArray.join(' ');
    }
  }

  return {
    ...bursaryObject,
  };
}

module.exports = santize;
