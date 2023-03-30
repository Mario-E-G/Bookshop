import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/service/authentication/auth.service";
import { BooksService } from "src/app/service/books/books.service";
import { Ibook } from "../interface/book";
import { bookReview } from "../interface/bookReview";
import { StarRatingColor } from "../stars-rating/stars-rating.component";

@Component({
  selector: "app-book-details",
  templateUrl: "./book-details.component.html",
  styleUrls: ["./book-details.component.css"],
})
export class BookDetailsComponent {
  error?: string;
  user!: any;
  haveTheBook: boolean = false;
  added: boolean = false;
  book_id!: any;
  book!: any;
  isLogged?: boolean;
  reviews: any[] = [];
  rating: any = 0;
  starCount: number = 5;
  avgRate!: number;
  visible!: boolean;
  showReviewForUpdate!: boolean;
  txtareavalue!: any;
  starColor: StarRatingColor = StarRatingColor.accent;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;

  constructor(
    private _BookService: BooksService,
    private _Router: ActivatedRoute,
    private _UserService: AuthService
  ) {
    this._UserService.currentLogUser.subscribe((user) => {
      this.user = user;
    });
    if (this.user.email != "") {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  ngOnInit() {
    this._Router.paramMap.subscribe((id) => {
      this.book_id = id.get("id");
    });

    this._BookService.getBookById(this.book_id).subscribe((book) => {
      this.book = book;
      this.avgRate = this.book;
    });

    if (this.isLogged) {
      this._BookService
        .getBookRate(this.book_id, this.user.user_id)
        .subscribe((rate) => {
          this.rating = rate.rate;
          console.log(this.rating.rate);
        });
    }

    this._BookService.getAllReviewForSpecificBook(this.book_id).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
      },
      error: (err) => {
        this.error = err.error.Message;
      },
    });
  }

  showDialog() {
    this.visible = true;
  }

  onRatingChanged(rating: any) {
    const rate = { rate: rating };
    this.rating = rating;
    this._BookService
      .updateBook(rate, this.book_id)
      .subscribe((response) => {
        this.rating = response;
        console.log(this.rating.rate);
      });

    this._BookService.getBookById(this.book_id).subscribe((book) => {
      this.book = book;
      this.avgRate = this.book;
    });
  }

  changeStatus(newStatus: string) {
    const book_status = { book_status: newStatus };
    this._BookService
      .updateBook(book_status, this.book_id)
      .subscribe((response) => {
        console.log(response);
      });
  }

  changeReview(newReview: any) {
    if (this.isLogged == true) {
      console.log(newReview.value);

      const review = {
        review: newReview.value,
        user_id: {
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          image_url: this.user.image_url,
        },
      };

      console.log(this.reviews);
      this.reviews.push(review);
      console.log(this.reviews);

      this._BookService
        .addReviewText(review, this.book_id, this.user.user_id)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (err) => {
            this.haveTheBook = true;
            this.error = err.error.Message;
          },
        });
      this.visible = false;
    } else {
      this.added = true;
      this.error = "You have to login first";
      this.visible = false;
    }
  }

  addReview() {
    if (this.isLogged == true) {
      this._BookService.addBookReview(this.book_id).subscribe({
        next: (book) => {
          console.log(book);
        },
        error: (err) => {
          this.haveTheBook = true;
          this.error = err.error.Message;
          console.log(err.error.Message);
        },
      });
      this.visible = false;
    } else {
      this.added = true;
      this.error = "You have to login first";
      this.visible = false;
    }
  }
  onDeleteReviewText(review_id: any) {
    console.log(review_id);
    this._BookService.deleteReviewText(review_id).subscribe({
      next: (newreview) => {
        console.log(newreview);
        this.reviews = newreview.review;
        // this._BookService.getAllReviewForSpecificBook(this.book_id).subscribe({
        //   next: (reviews) => {
        //     this.reviews = reviews;
        //   },
        //   error: (err) => {
        //     this.error = err.error.Message;
        //   },
        // });
      },
      error: (err) => {
        console.log("err");
      }
    })
  }
  onUpdateReviewText() {
    this.showReviewForUpdate = true;
  }
  updateReview(newReview: any, review_id: any) {
    const newRev = { review: newReview.value };
    this._BookService.updateReviewText(newRev, review_id).subscribe({
      next: (review) => {
        console.log(review);
        this.showReviewForUpdate = false;
        this._BookService.getAllReviewForSpecificBook(this.book_id).subscribe({
          next: (reviews) => {
            this.reviews = reviews;
          },
          error: (err) => {
            this.error = err.error.Message;
          },
        });
      },
      error: (err) => {
        console.log("err");
        this.showReviewForUpdate = false;
      }
    })
  }
}
