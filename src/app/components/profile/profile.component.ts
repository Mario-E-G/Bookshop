import { Component } from "@angular/core";
import { AuthService } from "src/app/service/authentication/auth.service";
import { User } from "../interface/user";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent {
  user?: User;

  constructor(private _UserService: AuthService) {}

  ngOnInit() {
    this.user = this._UserService.currentLogUser.value;
  }
}
