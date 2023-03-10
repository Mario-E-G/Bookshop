import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Ibook } from "./../../components/interface/book";

@Injectable({
  providedIn: "root",
})
export class BooksService {
  constructor(private _HttpClient: HttpClient) {}

  getAllBooks(): Observable<Ibook[]> {
    return this._HttpClient.get<Ibook[]>("http://localhost:5000/book");
  }
}
