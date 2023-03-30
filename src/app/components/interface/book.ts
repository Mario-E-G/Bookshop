import { Iauthor } from "./author";
import { ICategory } from "./category";
import { IfilteredBook } from "./filteredBook";

export interface Ibook {
  _id?: Number;
  book_id?: IfilteredBook;
  image_url?: string;
  name?: string;
  category_id?: ICategory;
  author_id?: Iauthor;
}
