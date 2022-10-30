import { get_bursary_data } from "../utils/getBursaryData"
import { load } from "cheerio"


export async function get_course_links() {
	// return all the course links from the zabursaries website
	const url = "https://www.zabursaries.co.za"
	const data = await get_bursary_data(url);
	const links: string [] = []

	const $ = load(data)

	$(".themonic-nav > .nav-menu > li > a").each((_, element) => {
		const link = $(element).attr("href")
		if(link && link.includes("south-africa")) {
			links.push(link)	
		}
	})

	return links
}
