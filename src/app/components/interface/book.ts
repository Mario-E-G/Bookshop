import { Iauthor } from "./author";

export interface Ibook {
  _id: Number;
  image_url: String;
  name: String;
  first_name: String;
  last_name?: String;
  author_id: Iauthor;
}
