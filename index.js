const axios = require('axios');
const cheerio = require('cheerio');

/**
 * @description This function makes a get request to the given URL
 * and returns the response in the form of an object containing the html content
 * @param {string} url
 * @return {Promise<object>} axios data object
 */
const getBursaryData = async (url) => {
  console.log('Busy crawling the web..🕷');

  try {
    const {data} = await axios.get(url);
    return data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * @description This function is used to parse the html given in the parameter
 * in order to return the list bursaries, title, bursaries that are always open.
 * @param {string} data
 * @return {object} {}
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

/**
 *
 * @param {string} bursaryMonth
 * @return {string} URL for the specified month
 */
const getBursaryDataByMonth = (bursaryMonth) => {
  let error = '';
  const bm = bursaryMonth.toLowerCase();

  const getMonths = Array.from({length: 12}, (e, i) => {
    const moty = new Date(null, i + 1, null)
        .toLocaleDateString('en', {month: 'long'});
    return moty;
  });

  const months = [];

  for (let index = 0; index < getMonths.length; index += 1) {
    const element = getMonths[index].toLowerCase();
    months.push(element);
  }

  const found = months.find((month) => month === bm);

  if (!found) {
    error = 'Could not find ' + bursaryMonth;
    return error;
  }

  const url = `https://www.zabursaries.co.za/bursaries-closing-in-${found}-2021/`;

  return url;
};

(async function main() {
  const url = getBursaryDataByMonth('September');
  const getData = await getBursaryData(url);
  const {alwaysOpen, bursaries, title} = parseResult(getData);

  const firstTen = bursaries.slice(3, 13);

  const data = {
    title,
    allBursaries: bursaries,
    alwaysOpen,
    firstTen,
  };

  console.log(data.allBursaries);
})();
