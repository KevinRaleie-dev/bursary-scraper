const url = 'https://www.zabursaries.co.za/bursaries-closing-in-september-2021/';
const months = Array.from({length: 12}, (e, i) => {
  const moty = new Date(null, i + 1, null)
      .toLocaleDateString('en', {month: 'long'});
  return moty;
});
const sampleMonths = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

module.exports = {
  url,
  months,
  sampleMonths,
};
