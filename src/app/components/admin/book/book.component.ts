import { Component } from '@angular/core';
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { AuthorService } from 'src/app/service/admin/author/author.service';
import { BookService } from 'src/app/service/admin/book/book.service';
import { CategoryService } from 'src/app/service/admin/category/category.service';
import { Ibook } from '../../interface/book';
import { User } from '../../interface/user';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: [MessageService, ConfirmationService],

})
export class AdminBookComponent {

  books!: any[];
  categories!: any[];
  authors!: any[];
  bookDialog!: boolean;
  book!: any;
  selectedBooks: any[] = [];
  submitted!: boolean;
  statuses!: any[];
  selectedBook!: any;
  error!: string;
  selectedFile!: File;
  newBook: boolean = false;
  constructor(
    private _BookService: BookService,
    private _CateService: CategoryService,
    private _AuthorService: AuthorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this._BookService.getAllBook().subscribe((book) => {
      console.log(book);
      this.books = book;
    });


    this._CateService.getAllCategory().subscribe((cate) => {
      console.log(cate);
      this.categories = cate;
    });

    this._AuthorService.getAllAuthor().subscribe((author) => {
      console.log(author);
      this.authors = author;
    });
  }

  selectAuthor(event: any) {
    console.log(event.target.value);
    this.book.author_id = event.target.value;
  }



  selectCategory(event: any) {
    console.log(event.target.value);
    this.book.category_id = event.target.value;
  }


  openNew() {
    this.newBook = true;
    this.book = {
      name: "",
      image_url: "",
      category_id: "",
      author_id: ""
    };
    this.submitted = false;
    this.newBook = true;
    this.bookDialog = true;
  }

  editBook(book: any) {
    this.book = { ...book };
    this.bookDialog = true;
  }

  deleteBook(book: any) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + book.name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this._BookService.deleteBook(book._id).subscribe({
          next: (response: any) => {
            this.books = response.books;
            this._BookService.getAllBook().subscribe((book) => {
              console.log(book);
              this.books = book;
            });
          },
          error: (err) => {
            // console.log(err);
            this.error = err.error.Message;
          },
        });
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "User Deleted",
          life: 3000,
        });
      },
      reject: () => {
        console.log("rejected");
      },
    });
  }

  hideDialog() {
    this.bookDialog = false;
    this.submitted = false;
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.currentFiles[0];
  }

  saveBook() {
    this.submitted = true;
    if ((this.book?.name).trim()) {
      if (this.book._id) {
        this.books[this.findIndexById(this.book?._id)] = this.book;
        const updateData = new FormData();

        updateData.append("name", this.book.name);
        if (this.selectedFile) {
          updateData.append("image_url", this.selectedFile, this.selectedFile.name);
          console.log("updatedDate : ");
          console.log(updateData);
        }
        // this._BookService
        //   .updateBook(formData, this.user._id)
        //   .subscribe((user) => {
        //     console.log(user);
        //   });

        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "User Updated",
          life: 3000,
        });
      } else {
        console.log(this.book);
        const newData = new FormData();
        newData.append("name", this.book.name);
        newData.append("name", this.book.category_id);
        newData.append("name", this.book.author_id);
        if (this.selectedFile) {
          newData.append("image_url", this.selectedFile, this.selectedFile.name);
          console.log("updatedDate : ");
          console.log(newData);
        }

        this._BookService.addBook(newData).subscribe({
          next: (book) => {
            this._BookService.getAllBook().subscribe((book) => {
              console.log(book);
              this.books = book;
            });
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: "User Updated",
              life: 3000,
            });
          }
        })
      }
    }

    this.books = [...this.books];
    this.bookDialog = false;
    this.book = {
      name: "",
      image_url: "",
    };

  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i]._id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
}
