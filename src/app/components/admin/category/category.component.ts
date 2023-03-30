import { Component } from "@angular/core";
import {
  ConfirmationService,
  MessageService,
  MenuItem,
  PrimeIcons,
} from "primeng/api";
import { CategoryService } from "src/app/service/admin/category/category.service";
import { ICategory } from "../../interface/category";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
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
export class AdminCategoryComponent {
  categories!: ICategory[];
  categoryDialog!: boolean;
  category!: ICategory;
  selectedCategories: ICategory[] = [];
  submitted!: boolean;
  statuses!: any[];
  selectedCategory!: ICategory;
  error!: string;
  constructor(
    private _CategoryService: CategoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this._CategoryService.getAllCategory().subscribe((category) => {
      console.log(category);
      this.categories = category;
    });
  }

  openNew() {
    this.category = {
      name: "",
      image_url: "",
    };
    this.submitted = false;
    this.categoryDialog = true;
  }

  deleteSelectedcategorys() {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete the selected categorys?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.categories = this.categories.filter((val) => {
          console.log(val);
          return !this.selectedCategories.includes(val);
        });
        this.selectedCategories = [
          {
            name: "",
            image_url: "",
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

  editCategory(category: ICategory) {
    this.category = { ...category };
    this.categoryDialog = true;
    console.log(category);
  }

  deleteCategory(category: ICategory) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + category.name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this._CategoryService.deleteCategory(category._id).subscribe({
          next: (response: any) => {
            this.categories = response.category;
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
    this.categoryDialog = false;
    this.submitted = false;
  }

  saveCategory() {
    this.submitted = true;

    if (this.category?.name.trim()) {
      if (this.category._id) {
        this.categories[this.findIndexById(this.category._id)] = this.category;
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "category Updated",
          life: 3000,
        });
      }

      this.categories = [...this.categories];
      this.categoryDialog = false;
      this.category = {
        _id: "",
        name: "",
        image_url: "",
      };
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i]._id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
}
