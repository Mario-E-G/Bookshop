import { Component } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { CategoryService } from "src/app/service/category.service";
import { ICategory } from "../interface/category";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"],
})
export class CategoriesComponent {
  categories!: ICategory[];
  categoryId!: string;
  books!: any;

  constructor(
    private _CategoryService: CategoryService,
    private _Router: ActivatedRoute
  ) {}

  ngOnInit() {
    this._CategoryService.getAllCategory().subscribe((category) => {
      this.categories = category;
    });
  }

}
