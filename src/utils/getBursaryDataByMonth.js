/**
 * @description This function returns an array of bursaries with the specified
 * month
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

module.exports = getBursaryDataByMonth;
