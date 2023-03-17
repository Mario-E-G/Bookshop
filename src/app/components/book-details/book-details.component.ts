import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BooksService } from "src/app/service/books/books.service";
import { Ibook } from "../interface/book";
import { StarRatingColor } from "../stars-rating/stars-rating.component";

@Component({
  selector: "app-book-details",
  templateUrl: "./book-details.component.html",
  styleUrls: ["./book-details.component.css"],
})
export class BookDetailsComponent {
  book_id!: any;
  book!: any;

  constructor(
    private _BookService: BooksService,
    private _Router: ActivatedRoute
  ) {}

  rating: number = 0;
  starCount: number = 5;
  avgRate!: number;
  starColor: StarRatingColor = StarRatingColor.accent;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;

  onRatingChanged(rating: any) {
    console.log(rating);
    this.rating = rating;
  }

  ngOnInit() {
    this._Router.paramMap.subscribe((id) => {
      this.book_id = id.get("id");
    });

    this._BookService.getBookById(this.book_id).subscribe((book) => {
      this.book = book;
    });
    this.avgRate = this.book;
  }

  addReview() {
    this._BookService.addBookReview(this.book_id).subscribe((book) => {
      console.log(book);
    });
  }
}
