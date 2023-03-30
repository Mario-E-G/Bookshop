import { Component, Input } from "@angular/core";
import { AuthService } from "src/app/service/authentication/auth.service";
import { User } from "../../interface/user";

@Component({
  selector: "app-admin-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class AdminHomeComponent {
  user!: User;
  @Input() usersLength: any;

  constructor(private _UserService: AuthService) { }

  ngOnInit() {
    this._UserService.currentLogUser.subscribe((user) => {
      this.user = user;
    });
  }
}
