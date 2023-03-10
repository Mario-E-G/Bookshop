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
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern("^[a-zA-Z0-9]*"),
        ],
      ],
    });
  }

  onSubmit(loginForm: FormGroup) {
    this._AuthService.login(loginForm.value).subscribe({
      next: () => {
        this.router.navigate(["/book"]);
      },
      error: (err) => {
        this.error = err.error.Message;
      },
    });

    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    console.log("Form submitted successfully");
  }
}
