import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { AboutComponent } from "./components/about/about.component";
import { AuthorsComponent } from "./components/authors/authors.component";
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
  { path: "authors", component: AuthorsComponent },
  { path: "categories", component: CategoriesComponent },
  { path: "aboutus", component: AboutComponent },
  { path: "profile", canActivate: [AuthGuard], component: ProfileComponent },
  { path: "profile/:id", canActivate: [AuthGuard], component: ProfileComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "**", component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
