import { Iauthor } from "./author";
import { IfilteredBook } from "./filteredBook";

export interface Ibook {
  _id?: Number;
  book_id?: IfilteredBook;
  image_url?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  author_id?: Iauthor;
}
