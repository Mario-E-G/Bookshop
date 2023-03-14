import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { AboutComponent } from "./components/about/about.component";
import { AdminComponent } from "./components/admin/admin.component";
import { AuthorsComponent } from "./components/authors/authors.component";
import { BookDetailsComponent } from "./components/book-details/book-details.component";
import { BooksByCatComponent } from "./components/books-by-cat/books-by-cat.component";
import { BooksComponent } from "./components/books/books.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { RegisterComponent } from "./components/register/register.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "books", component: BooksComponent },
  { path: "book/:id", component: BookDetailsComponent },
  { path: "authors", component: AuthorsComponent },
  { path: "categories", component: CategoriesComponent },
  { path: "category/:id", component: BooksByCatComponent },
  { path: "aboutus", component: AboutComponent },
  { path: "profile", canActivate: [AuthGuard], component: ProfileComponent },
  {
    path: "profile/:id",
    canActivate: [AuthGuard],
    component: ProfileComponent,
  },
  { path: "admin", component: AdminComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "**", component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
