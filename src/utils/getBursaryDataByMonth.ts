import { sampleMonths } from "../constants/mod";

export function get_bursary_data_by_month (bursary_month: string) { 
  const month = sampleMonths.find(
    (m) => m === bursary_month.toLowerCase()
  );

  if (!month) {
    return "Could not find " + bursary_month;
  }

  return `https://www.zabursaries.co.za/bursaries-closing-in-${month}-2023/`;
}
