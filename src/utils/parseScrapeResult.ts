import { load } from "cheerio";

type BursData = {
  title: string;
  bursaries: string[];
  links: string[];
};

export const parse_result = async (data: string) => {
  const $ = load(data);
  const bursaryData: BursData = {
    title: "",
    bursaries: [],
    links: [],
  };

  bursaryData.title = $(".entry-content > h1").text();

  $(".entry-content > ul > li").each((_, el) => {
    const bursary = $(el).text();
    bursaryData.bursaries.push(bursary);
  });

  // fetch links for each bursary
  $(".entry-content > ul > li > strong > a").each((_, el) => {
    const link = $(el).attr("href");
    if (link) {
      bursaryData.links.push(link);
    }
  });

  // cap the list of bursaries that are only open for a certain time
  for (const index in bursaryData.bursaries) {
    if (
      !bursaryData.bursaries[index].includes("closing") &&
      !bursaryData.bursaries[index].includes("Closing")
    ) {
      bursaryData.bursaries.length = Number(index);
    }
  }

  return bursaryData;
};

