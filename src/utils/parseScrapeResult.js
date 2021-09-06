const cheerio = require('cheerio');

/**
 * @description This function is used to parse the html given in the parameter
 * in order to return the list bursaries, title, bursaries that are always open.
 * @param {string} data
 * @return {object} {title, bursaries, alwaysOpen}
 */
const parseResult = (data) => {
  const $ = cheerio.load(data);

  const bursaries = [];
  const title = $('.entry-content > h1').text();
  $('.entry-content > ul > li').each((_idx, el) => {
    const bursary = $(el).text();
    bursaries.push(bursary);
  });

  // find bursaries that are open all year round
  const alwaysOpen = [];
  for (let index = 0; index < bursaries.length; index += 1) {
    if (!bursaries[index].includes('closing') &&
  !bursaries[index].includes('Closing')) {
      alwaysOpen.push(bursaries[index]);
    }
  }

  return {
    title,
    bursaries,
    alwaysOpen,
  };
};

module.exports = parseResult;
