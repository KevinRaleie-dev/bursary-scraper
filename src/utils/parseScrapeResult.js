const cheerio = require('cheerio');

/**
 * @description This function is used to parse the html given in the parameter
 * in order to return the list bursaries, title, bursaries that are always open.
 * @param {string} data
 * @return {object} returns an object containing the title, bursaries,
 * links and always open bursaries
 */
const parseResult = (data) => {
  const $ = cheerio.load(data);
  const bursaryData = {
    title: '',
    bursaries: [],
    links: [],
  };

  bursaryData.title = $('.entry-content > h1').text();

  $('.entry-content > ul > li').each((_, el) => {
    const bursary = $(el).text();
    bursaryData.bursaries.push(bursary);
  });

  // fetch links for each bursary
  $('.entry-content > ul > li > strong > a').each((_, el) => {
    const link = $(el).attr('href');
    bursaryData.links.push(link);
  });

  // cap the list of bursaries that are only open for a certain time
  for (const index in bursaryData.bursaries) {
    if (!bursaryData.bursaries[index].includes('closing') &&
    !bursaryData.bursaries[index].includes('Closing')) {
      bursaryData.bursaries.length = index;
    }
  }

  return {
    ...bursaryData,
  };
};

module.exports = parseResult;
