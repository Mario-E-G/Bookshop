import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/service/authentication/auth.service";
import { User } from "../interface/user";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  newUser!: User;
  error?: String;

  constructor(
    private _AuthService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  registerForm!: FormGroup;
  submitted = false;

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        first_name: ["", Validators.required],
        last_name: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        birth_date: [""],
        address: [""],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern("^[a-zA-Z0-9]*"),
          ],
        ],
        confirm_password: ["", Validators.required],
        gender: [""],
        image_url: [""],
        // agree_terms: ['', Validators.required]
      },
      { validator: this.matchingPasswords("password", "confirm_password") }
    );
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const confirm_password = group.controls[confirmPasswordKey];

      if (password.value !== confirm_password.value) {
        confirm_password.setErrors({ passwordMismatch: true });
      }
    };
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(f: FormGroup) {
    this.submitted = true;
    if (this.registerForm.invalid) {
      console.log(f);
      return;
    }

    this._AuthService.register(f.value).subscribe({
      next: (response) => {
        if (response.status === 200) {
          console.log("Form submitted successfully");
          this.router.navigate(["/login"]);
        }
      },
      error: (error) => {
        if (error.status === 0) {
          this.error =
            "Unable to connect to the server. Please try again later.";
        } else if (error.status === 400) {
          this.error = error.error.message;
        } else if (error.status === 409) {
          this.error = error.error.message;
          setTimeout(() => {
            this.router.navigate(["/login"]);
          }, 3000); // wait for 3 seconds before navigating
        } else {
          this.error = "An unknown error has occurred. Please try again later.";
        }
      },
    });
  }
}
