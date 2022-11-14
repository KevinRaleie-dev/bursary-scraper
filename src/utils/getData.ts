import { array_bursary_objects } from "../utils/arrOfBursaryObjects";
import { get_bursary_data } from "../utils/getBursaryData";
import { parse_course_result, parse_result } from "../utils/parseScrapeResult";
import { get_application_links } from "./getApplicationLinks";
import type { Bursary } from "./sanitizeData";

export type Data = {
  title: string;
  bursaryList: Bursary[];
  links: string[];
};

export async function get_courses_data(url: string) {

  const response = await get_bursary_data(url)
  const { title, bursaries, links } = parse_course_result(response)
  const bursary_list = array_bursary_objects(bursaries, links, null)

  return {
    title,
    bursary_list,
    links
  }
}

export async function get_bursaries_data(url: string): Promise<Data> {
  const response = await get_bursary_data(url);
  const { title, bursaries, links } = await parse_result(response);

  const app_links = await get_application_links(links);
  const bursaryList = array_bursary_objects(bursaries, links, app_links);

  const data: Data = {
    title,
    bursaryList,
    links,
  };

  return data;
}
