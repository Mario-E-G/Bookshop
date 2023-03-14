import { Component } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { AuthService } from "src/app/service/authentication/auth.service";
import { BooksService } from "src/app/service/books/books.service";
import { Ibook } from "../interface/book";
import { bookReview } from "../interface/bookReview";
import { User } from "../interface/user";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent {
  user!: User;
  books?: bookReview[];
  filter!: ParamMap;

  constructor(
    private _UserService: AuthService,
    private _BookService: BooksService,
    private _Router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.user = this._UserService.currentLogUser.value;
    this._BookService
      .getAllbooksForSpecificUser(this.user.user_id)
      .subscribe((book) => {
        this.books = book;
      });
  }
}
