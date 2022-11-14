import { course_tags } from "./courseTags";
import { get_course_links } from "./getCourseLinks";

export async function find_link(course: string): Promise<string | null> {
  const links = await get_course_links();
  const tags = course_tags(links);

  const found = tags.find((item) => item === course);

  if (found) {
    // decrementing only because theres two instances of science in the array
    // and computer-science appears first
    for (let i = links.length; i--; ) {
      const link = links[i].includes(course);
      if (link) {
        return links[i];
      }
    }
  }

  return null;
}
