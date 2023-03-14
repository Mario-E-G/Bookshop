import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/service/authentication/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  email!: string;
  password!: string;
  error?: String;
  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _AuthService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required]],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
        ],
      ],
    });
  }

  onSubmit(loginForm: FormGroup) {

      // stop here if form is invalid
      if (this.loginForm.invalid) {
        return;
      }
    this._AuthService.login(loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem("token", response.token);
        this._AuthService.detachToken();
        this.router.navigate(["/"]);
      },
      error: (err) => {
        this.error = err.error.Message;        
      },
    });

    this.submitted = true;

  
  }
}
