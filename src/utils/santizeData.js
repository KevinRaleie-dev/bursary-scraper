/**
 * @description This function takes in a string and returns an object
 * @param {string} text
 * @return {object}
 */
function santize(text) {
  const t = text.split('(').join('').split(')').join('');
  const c = t.split(' ');
  let closing;
  let name;
  for (let i = 0; i < c.length; i += 1) {
    if (c[i] === 'closing:' || c[i] === 'Closing:') {
      closing = c.slice(i + 1).join(' ');
      c.length = i;
      name = c.join(' ');
    }
  }
  return {
    closing,
    name,
  };
}

module.exports = santize;
