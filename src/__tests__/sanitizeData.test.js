const sanitize = require('../utils/santizeData');

test('should sanitize a string and return as an object', () => {
  const exampleText = 'Zutari Bursary (Closing: 15 November 2021)';
  const obj = sanitize(exampleText);
  expect(obj).toEqual({
    closing: '15 November 2021',
    name: 'Zutari Bursary',
    link: '',
  });
});
