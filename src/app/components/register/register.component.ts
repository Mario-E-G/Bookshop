import { HttpErrorResponse, HttpSentEvent } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
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
  error?: string;
  choosen?: boolean;
  registerForm!: FormGroup;
  selectedFile?: File;
  submitted = false;
  passwd!: any;
  cpasswd!: any;
  show = false;
  showCPass = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.passwd = "password";
    this.cpasswd = "password";
  }

  buildForm(): void {
    this.registerForm = this.formBuilder.group(
      {
        first_name: ["", Validators.required],
        last_name: ["", Validators.required],
        email: [
          "",
          [
            Validators.required,
            Validators.email,
            Validators.pattern(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
            ),
          ],
        ],
        birth_date: ["", this.validateBirthDate],
        address: [""],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
            ),
          ],
        ],
        confirm_password: ["", Validators.required],
        gender: [""],
        image_url: [""],
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

  validateBirthDate(control: AbstractControl) {
    const selectedDate = new Date(control.value);
    const today = new Date();

    if (selectedDate > today) {
      return { invalidBirthDate: true };
    }
    return null;
  }

  get f() {
    return this.registerForm.controls;
  }

  onFileSelected(event: any) {
    if (event.target.value) {
      this.selectedFile = event.target.files[0];
      this.choosen = true;
    }
  }

  onSubmit(registerForm: FormGroup) {


    if (this.registerForm.invalid) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      this.error = "Form is invalid!";
      return;
    }

    const formData = new FormData();

    formData.append("first_name", this.f["first_name"].value);
    formData.append("last_name", this.f["last_name"].value);
    formData.append("email", this.f["email"].value);
    formData.append("password", this.f["password"].value);
    formData.append("gender", this.f["gender"].value);
    formData.append("address", this.f["address"].value);
    formData.append("birth_date", this.f["birth_date"].value);

    if (this.selectedFile) {
      formData.append("image_url", this.selectedFile, this.selectedFile.name);
    }

    this.authService.register(formData).subscribe({
      next: (response: any) => {
        if (response.status == 201) {
          this.submitted = true;
          setTimeout(() => {
            this.router.navigate(["/login"]);
          }, 3000);
        }
        if (response.status == 409) {
          setTimeout(() => {
            this.router.navigate(["/login"]);
          }, 3000);
        }
      },
      error: (err) => {
        this.error = err.error.Message;
      },
    });
  }

  onClick() {
    if (this.passwd === "password") {
      this.passwd = "text";
      this.show = true;
    } else {
      this.passwd = "password";
      this.show = false;
    }
  }

  onClickCPasswd() {
    if (this.cpasswd === "password") {
      this.cpasswd = "text";
      this.showCPass = true;
    } else {
      this.cpasswd = "password";
      this.showCPass = false;
    }
  }
}
