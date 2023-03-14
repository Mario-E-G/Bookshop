import { Component } from "@angular/core";
import { AuthService } from "src/app/service/authentication/auth.service";
import { User } from "../interface/user";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  islogged?: boolean = false;
  user?: User;

  constructor(private _AuthService: AuthService) {
    this._AuthService.currentLogUser.subscribe(() => {
      if (this._AuthService.currentLogUser.getValue().email == "") {
        this.islogged = false;
      } else {
        this.islogged = true;
        this.user = this._AuthService.currentLogUser.value;
        console.log(this.user);
      }
    });
  }

  logout() {
    this._AuthService.logout();
  }

  dropdownMenu() {}
}
