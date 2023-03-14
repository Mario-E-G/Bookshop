import { IfilteredBook } from "./filteredBook";
import { User } from "./user";

enum bookStatus {
  all,
  new,
  read,
  currently_reading,
  want_to_read,
}

export interface bookReview {
  _id?: Number;
  book_id?: IfilteredBook;
  rate?: Number;
  average_rate?: Number;
  book_status?: bookStatus;
  user_id?: User;
}
