import { sampleMonths } from "../constants/mod";

export function find_month(searchText: string): string {
  const month_set = new Set();
  let month = "";
  const words = searchText.toLowerCase().trim();
  const searchWords = words.split(" ");
  for (const m of sampleMonths) {
    month_set.add(m);
  }
  // for (let i = 0; i < sampleMonths.length; i += 1) {
  //   myMonthSet.add(sampleMonths[i]);
  // }
  for (let i = 0; i < searchWords.length; i += 1) {
    if (month_set.has(searchWords[i])) {
      month = searchWords[i];
    }
  }
  return month;
}
