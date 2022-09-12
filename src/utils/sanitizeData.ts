export type Bursary = {
  closing: string;
  name: string;
  link?: string;
  applicationLink?: string;
};

export function sanitize_data(bursary: string): Bursary {
  const title = separator(bursary);
  const title_array = title.split(" ");
  const bursary_object: Bursary = {
    closing: "",
    name: "",
    link: "",
  };

  for (let index = 0; index < title_array.length; index++) {
    if (
      title_array[index] === "closing:" ||
      title_array[index] === "Closing:"
    ) {
      bursary_object.closing = title_array.slice(index + 1).join(" ");
      title_array.length = index;
      bursary_object.name = title_array.join(" ");
    }
  }

  return bursary_object;
}

const separator = (bursary: string) =>
  bursary.split("(").join("").split(")").join("");
