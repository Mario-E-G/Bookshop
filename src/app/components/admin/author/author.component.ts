import { Component, OnInit } from "@angular/core";
import { Iauthor } from "../../interface/author";
import { AuthorService } from "src/app/service/admin/author/author.service";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-author",
  templateUrl: "./author.component.html",
  styleUrls: ["./author.component.css"],
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  providers: [MessageService, ConfirmationService],
})
export class AdminAuthorComponent {
  authors!: Iauthor[];
  authorDialog!: boolean;
  author!: Iauthor;
  selectedAuthors: Iauthor[] = [];
  submitted!: boolean;
  statuses!: any[];
  selectedAuthor!: Iauthor;
  error!: string;
  constructor(
    private _AuthorService: AuthorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this._AuthorService.getAllAuthor().subscribe((author) => {
      console.log(author);
      this.authors = author;
    });
  }

  openNew() {
    this.author = {
      _id: "",
      first_name: "",
      last_name: "",
      date_of_birth: new Date(),
      image_url: "",
      author_info: "",
    };
    this.submitted = false;
    this.authorDialog = true;
  }

  deleteSelectedcategorys() {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete the selected categorys?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.authors = this.authors.filter((val) => {
          console.log(val);
          return !this.selectedAuthors.includes(val);
        });
        this.selectedAuthors = [
          {
            _id: "",
            first_name: "",
            last_name: "",
            date_of_birth: new Date(),
            image_url: "",
            author_info: "",
          },
        ];
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Products Deleted",
          life: 3000,
        });
      },
    });
  }

  editAuthor(author: Iauthor) {
    this.author = { ...author };
    this.authorDialog = true;
    console.log(author);
  }

  deleteAuthor(author: Iauthor) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + author.first_name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this._AuthorService.deleteAuthor(author._id).subscribe({
          next: (response: any) => {
            this.authors = response.author;
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
    this.authorDialog = false;
    this.submitted = false;
  }

  saveAuthor() {
    this.submitted = true;

    if (this.author.first_name.trim()) {
      if (this.author._id) {
        this.authors[this.findIndexById(this.author._id)] = this.author;
        console.log("from saveUser: " + this.author.first_name);
        console.log("from saveUser: " + this.author._id);

        this._AuthorService
          .updateAuthor(this.author, this.author._id)
          .subscribe((author) => {
            console.log(author);
          });

        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "User Updated",
          life: 3000,
        });
      }

      this.authors = [...this.authors];
      this.authorDialog = false;
      this.author = {
        _id: "",
        first_name: "",
        last_name: "",
        date_of_birth: new Date(),
        image_url: "",
        author_info: "",
      };
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.authors.length; i++) {
      if (this.authors[i]._id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
}
