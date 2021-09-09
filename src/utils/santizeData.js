/**
 * @description This function takes in a string and returns an object
 * @param {string} bursary
 * @return {object}
 */
function santize(bursary) {
  const text = bursary.split('(').join('').split(')').join('');
  const textArray = text.split(' ');
  const obj = {
    closing: '',
    name: '',
    link: '',
  };

  for (let i = 0; i < textArray.length; i += 1) {
    if (textArray[i] === 'closing:' || textArray[i] === 'Closing:') {
      obj.closing = textArray.slice(i + 1).join(' ');
      textArray.length = i;
      obj.name = textArray.join(' ');
    }
  }
  return {
    ...obj,
  };
}

module.exports = santize;
