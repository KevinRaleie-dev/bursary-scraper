import { sampleMonths } from "../constants/mod";

export const get_bursary_data_by_month = (bursary_month: string) => {
  let error: string = "";
  const found_month = sampleMonths.find(
    (month) => month === bursary_month.toLowerCase()
  );

  if (!found_month) {
    error = "Could not find " + bursary_month;
    return error;
  }

  return `https://www.zabursaries.co.za/bursaries-closing-in-${found_month}-2022/`;
};
