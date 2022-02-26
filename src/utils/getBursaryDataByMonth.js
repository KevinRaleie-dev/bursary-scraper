const {months} = require('../constants/mod');
/**
 * @description This function returns a URL to be used to fetch data from.
 * @param {string} month
 * @return {string} A URL for the specified month and the year of 2022
 */
const getBursaryDataByMonth = (month) => {
  const bursaryMonth = month.toLowerCase();
  const data = {
    error: '',
    bursaryMonth,
    months: [],
    url: '',
  };

  for (let index = 0; index < months.length; index += 1) {
    const element = months[index].toLowerCase();
    data.months.push(element);
  }

  const findMonth = data.months.find((month) => month === data.bursaryMonth);

  if (!findMonth) {
    data.error = 'Could not find ' + month;
    return data.error;
  }

  data.url = `https://www.zabursaries.co.za/bursaries-closing-in-${findMonth}-2022/`;

  return data.url;
};

module.exports = getBursaryDataByMonth;
