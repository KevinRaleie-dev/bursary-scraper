const {months} = require('../constants');
/**
 * @description This function returns a URL to be used to fetch data from.
 * @param {string} month
 * @return {object} URLS for the specified month and year
 */
const getBursaryDataByMonth = (month) => {
  const bursaryMonth = month.toLowerCase();
  const data = {
    error: '',
    bursaryMonth,
    months: [],
    urls: {
      t1: '',
      t2: '',
    },
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

  data.urls.t1 = `https://www.zabursaries.co.za/bursaries-closing-in-${findMonth}-2021/`;
  data.urls.t2 = `https://www.zabursaries.co.za/bursaries-closing-in-${findMonth}-2022/`;

  return {
    ...data.urls,
  };
};

module.exports = getBursaryDataByMonth;
