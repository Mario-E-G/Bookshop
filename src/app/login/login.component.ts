import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginauthService } from '../services/loginauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private _authservice:LoginauthService, // to make from it an object 

  ) {}

  // login() {
  //   const data = {
  //     email: this.email,
  //     password: this.password,
  //   };
  //     // subscribe to call the observable
  //   this.http.post('http://localhost:3000/login', data).subscribe(
  //     //response will get the return of api 
  //     (response) => {
  //       console.log(response);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

  loginForm!: FormGroup;
  submitted = false;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^[a-zA-Z0-9]*'),
        ],
      ],
    });
  }

  get field() {
    return this.loginForm.controls;
  }

  onSubmit(loginForm:FormGroup) {
    console.log(loginForm.value);
    
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // do something when form is submitted successfully
    console.log('Form submitted successfully');
    //this.router.navigate(['/home']);
  }
}