import { Component, Input } from "@angular/core";
import { BooksService } from "./../../service/books/books.service";
import { Ibook } from "./../interface/book";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css"],
})
export class BooksComponent {
  books!: Ibook[];

  constructor(private _BooksService: BooksService) {}

  ngOnInit() {
    this._BooksService.getAllBooks().subscribe({
      next: (book) => {
        this.books = book;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // @Input() books: Book
}
