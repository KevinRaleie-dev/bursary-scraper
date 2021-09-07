const getBursaryDataByMonth = require('../utils/getBursaryDataByMonth');

test('should return the url to fetch data for the given month', () => {
  const month = 'september';
  const url = `https://www.zabursaries.co.za/bursaries-closing-in-${month}-2021/`;

  expect(getBursaryDataByMonth(month)).toMatch(url);
});
