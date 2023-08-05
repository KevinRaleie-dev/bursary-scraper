import { sanitize_data, Bursary } from "./sanitizeData";

export function array_bursary_objects(
  bursaries: string[],
  urlLinks: string[],
  appLinks?: string[] 
): Bursary[] {
  const bursary_object_array: Bursary[] = [];

  for (const bursary of bursaries) {
    const bursary_object = sanitize_data(bursary);
    bursary_object_array.push(bursary_object);
  }

  for (const index in bursary_object_array) {
    bursary_object_array[index].link = urlLinks[index];
  }

  if (typeof appLinks !== 'undefined') {
    for (const index in bursary_object_array) {
      bursary_object_array[index].applicationLink = appLinks[index];
    }
  }
  return bursary_object_array;
}
