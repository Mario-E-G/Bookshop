import { Iauthor } from "./author";

export interface IfilteredBook {
  book_id?: Number;
  image_url?: string;
  name: string;
  author_id: Iauthor;
}
