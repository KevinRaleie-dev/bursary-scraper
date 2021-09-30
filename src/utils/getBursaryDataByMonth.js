const {months} = require('../constants');
/**
 * @description This function returns a URL to be used to fetch data from.
 * @param {string} bursaryMonth
 * @return {string} URL for the specified month
 */
const getBursaryDataByMonth = (bursaryMonth) => {
  const burMonth = bursaryMonth.toLowerCase();
  const dataObj = {
    error: '',
    moty: burMonth,
    months: [],
    url: '',
  };

  for (let index = 0; index < months.length; index += 1) {
    const element = months[index].toLowerCase();
    dataObj.months.push(element);
  }

  const findMonth = dataObj.months.find((month) => month === dataObj.moty);

  if (!findMonth) {
    dataObj.error = 'Could not find ' + bursaryMonth;
    return dataObj.error;
  }

  dataObj.url = `https://www.zabursaries.co.za/bursaries-closing-in-${findMonth}-2021/`;

  return dataObj.url;
};

module.exports = getBursaryDataByMonth;
