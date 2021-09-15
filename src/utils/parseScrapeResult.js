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
  const bursaryObj = {
    title: '',
    bursaries: [],
    links: [],
    alwaysOpen: [],
  };

  bursaryObj.title = $('.entry-content > h1').text();

  $('.entry-content > ul > li').each((_, el) => {
    const bursary = $(el).text();
    bursaryObj.bursaries.push(bursary);
  });

  // fetch links for each bursary
  $('.entry-content > ul > li > strong > a').each((_, el) => {
    const link = $(el).attr('href');
    bursaryObj.links.push(link);
  });

  // find bursaries that are open all year round
  for (let index = 0; index < bursaryObj.bursaries.length; index += 1) {
    if (!bursaryObj.bursaries[index].includes('closing') &&
  !bursaryObj.bursaries[index].includes('Closing')) {
      bursaryObj.alwaysOpen.push(bursaryObj.bursaries[index]);
    }
  }

  // cap the list of bursaries that are only open for a certain time
  for (let i = 0; i < bursaryObj.bursaries.length; i++) {
    if (!bursaryObj.bursaries[i].includes('closing') &&
    !bursaryObj.bursaries[i].includes('Closing')) {
      bursaryObj.bursaries.length = i;
    }
  }

  return {
    ...bursaryObj,
  };
};

module.exports = parseResult;
