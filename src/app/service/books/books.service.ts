import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../authentication/auth.service";
import { Ibook } from "./../../components/interface/book";

@Injectable({
  providedIn: "root",
})
export class BooksService {
  constructor(
    private _HttpClient: HttpClient,
    private _UserService: AuthService
  ) {}

  headers = { "access-token": `${this._UserService.getToken()}` };

  requestOptions = { headers: this.headers };

  getAllBooks(): Observable<Ibook[]> {
    return this._HttpClient.get<Ibook[]>(
      "http://localhost:5000/book",
      this.requestOptions
    );
  }

  getBookById(book_id: any): Observable<Ibook> {
    return this._HttpClient.get<Ibook>(
      `http://localhost:5000/book/${book_id}`,
      this.requestOptions
    );
  }

  getAllbooksForSpecificUser(user_id: string): Observable<Ibook[]> {
    return this._HttpClient.get<Ibook[]>(
      `http://localhost:5000/profile/${user_id}`,
      this.requestOptions
    );
  }

  getBookWithStatus(user_id: string, status: any): Observable<Ibook[]> {
    console.log("id: " + user_id + " status: " + status);
    return this._HttpClient.get<Ibook[]>(
      `http://localhost:5000/profile/${user_id}?filter=${status}`,
      this.requestOptions
    );
  }
}
