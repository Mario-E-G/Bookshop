import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // we will use the rxjs

@Injectable({
  providedIn: 'root'
})
export class LoginauthService {

  constructor(private _HttpClient:HttpClient) {}

   // method will call the api  //
  login (formData:any) : Observable <any> {

  return this._HttpClient.post('http://localhost:6000/login',formData) // formdata is data that i will send it and formdata should be object

// we should path the url und data to the post methode
 }
}
