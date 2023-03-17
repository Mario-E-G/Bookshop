import { NgModule, Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { RegisterComponent } from "./components/register/register.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { AboutComponent } from "./components/about/about.component";
import { BooksComponent } from "./components/books/books.component";
import { AuthorsComponent } from "./components/authors/authors.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HomeComponent } from "./components/home/home.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { UsersidebarComponent } from "./components/usersidebar/usersidebar.component";
import { BooksByCatComponent } from "./components/books-by-cat/books-by-cat.component";
import { BookDetailsComponent } from "./components/book-details/book-details.component";
import { StarRatingComponent } from "./components/stars-rating/stars-rating.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { AuthorDetailsComponent } from "./components/author-details/author-details.component";
import { CategoryComponent } from './components/admin/category/category.component';
import { BookComponent } from './components/admin/book/book.component';
import { AuthorComponent } from './components/admin/author/author.component';
import { UserComponent } from './components/admin/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    NotfoundComponent,
    AboutComponent,
    BooksComponent,
    AuthorsComponent,
    CategoriesComponent,
    FooterComponent,
    HomeComponent,
    ProfileComponent,
    UsersidebarComponent,
    BooksByCatComponent,
    BookDetailsComponent,
    StarRatingComponent,
    AuthorDetailsComponent,
    CategoryComponent,
    BookComponent,
    AuthorComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
