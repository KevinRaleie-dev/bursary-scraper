import { get_course_links } from "./getCourseLinks"

export async function course_tags() {
	const links = await get_course_links()
	const tags: string[] = []

	for (const link of links) {
		const regex = /(?:za\/)(\w+)/g
		const tag = link.match(regex)

		if(tag) {
			const t = tag[0]
			const regx = /[^/]*$/g
			const match = t.match(regx)

			if(match) {
				tags.push(match[0])
			}
		}
	}

	return tags
}
