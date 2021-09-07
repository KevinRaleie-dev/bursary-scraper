const getBursaryData = require('../utils/getBursaryData');
const parseResult = require('../utils/parseScrapeResult');
const {url} = require('../constants');

test('should return a title and array of bursaries', () => {
  const response = getBursaryData(url);

  expect(parseResult(response)).toBeDefined();
});
