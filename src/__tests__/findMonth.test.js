const findMonth = require('../utils/findMonth');

test('should return a month from the given month array and string', () => {
  const exampleText = 'Bursaries that are closing in september';
  const month = findMonth(exampleText);
  expect(month).toMatch(/september/);
});
