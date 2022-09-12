import axios, { AxiosResponse } from "axios";
import { load } from "cheerio";

export async function get_application_links(
  links: string[]
): Promise<string[]> {
  const applicationLinks: string[] = [];
  const requests: Promise<AxiosResponse<any, any>>[] = [];

  for (let i = 0; i < links.length; i++) {
    const request = axios.get(links[i]);
    requests.push(request);
  }
  await Promise.all(requests).then((data) => {
    data.map((response) => {
      const link = parse(response.data);
      if (link) {
        applicationLinks.push(link);
      }
    });
  });

  return applicationLinks;
}

function parse(data: string): string | null {
  const $ = load(data);
  const link = $(".entry-content > p > strong > a").attr("href");
  if (link) return link;
  return null;
}
