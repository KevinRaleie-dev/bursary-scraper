const {months} = require('../constants');
/**
 * @description This function returns a URL to be used to fetch data from.
 * @param {string} month
 * @return {string} URL for the specified month
 */
const getBursaryDataByMonth = (month) => {
  const bursaryMonth = month.toLowerCase();
  const data = {
    error: '',
    bursaryMonth,
    months: [],
    urls: [],
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

  data.urls.push(`https://www.zabursaries.co.za/bursaries-closing-in-${findMonth}-2021/`);
  data.urls.push(`https://www.zabursaries.co.za/bursaries-closing-in-${findMonth}-2022/`);

  return [data.urls[0], data.urls[1]];
};

module.exports = getBursaryDataByMonth;
