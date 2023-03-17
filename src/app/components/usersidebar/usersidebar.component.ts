import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { BooksService } from "src/app/service/books/books.service";
import { Ibook } from "../interface/book";
import { bookReview } from "../interface/bookReview";
import { User } from "../interface/user";

@Component({
  selector: "app-usersidebar",
  templateUrl: "./usersidebar.component.html",
  styleUrls: ["./usersidebar.component.css"],
})
export class UsersidebarComponent {
  @Input() user!: User;
  // @Output() books = new EventEmitter();
  opened: boolean = false;
  filter!: ParamMap;
  @Input() filteredBooks?: bookReview[];
  @Output() newItemEvent = new EventEmitter<bookReview[]>();
  constructor(
    private _Router: ActivatedRoute,
    private _BookService: BooksService
  ) {}

  ngOninit() {}

  // getFilteredBooks(event: any) {
  //   this._BookService
  //     .getBookWithStatus(this.user?.user_id, this.filter.get("filter"))
  //     .subscribe((books) => {
  //       this.filteredBooks = books;
  //       this.filteredBooks = event as bookReview[];
  //       this.newItemEvent.emit(this.filteredBooks);
  //       console.log(this.filteredBooks);
  //     });
  // }
}
