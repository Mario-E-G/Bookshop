import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './../../components/interface/user';
import { environment } from '../../../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}
  private apiBaseUrl = environment.apiBaseUrl;

  register(user: User) {
    return this._HttpClient.post<any>(`${this.apiBaseUrl}/register`, user)
    }

    login (formData:any) : Observable <any> {

      return this._HttpClient.post(`${this.apiBaseUrl}/login`,formData)
    }
  }