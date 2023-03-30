import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../../authentication/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthorService {
  constructor(
    private _HttpClient: HttpClient,
    private _UserService: AuthService
  ) {}
  headers = { "access-token": `${this._UserService.getToken()}` };

  requestOptions = { headers: this.headers };

  getAllAuthor(): Observable<any> {
    return this._HttpClient.get<any>(
      "http://localhost:5000/admin/author",
      this.requestOptions
    );
  }

  updateAuthor(data: any, author_id: any) {
    return this._HttpClient.patch(
      `http://localhost:5000/admin/author/${author_id}`,
      data,
      this.requestOptions
    );
  }

  deleteAuthor(author_id: any): Observable<any> {
    return this._HttpClient.delete<any>(
      `http://localhost:5000/admin/author/${author_id}`,
      this.requestOptions
    );
  }
}
