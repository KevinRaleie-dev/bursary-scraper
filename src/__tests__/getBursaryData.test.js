const getBursaryData = require('../utils/getBursaryData');
const {url} = require('../constants');

test('should return html from given url', (done) => {
  try {
    expect(getBursaryData(url)).toBeDefined();
    done();
  } catch (error) {
    done(error);
  }
});
