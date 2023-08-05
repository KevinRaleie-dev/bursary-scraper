import { sampleMonths } from "../constants/mod";

export function find_month(search: string): string {
  const month_set = new Set();
  let month = "";
  const word = search.toLowerCase().trim();
  const searchWords = word.split(" ");
  for (const m of sampleMonths) {
    month_set.add(m);
  }
 for (let i = 0; i < searchWords.length; i += 1) {
    if (month_set.has(searchWords[i])) {
      month = searchWords[i];
    }
  }
  return month;
}
