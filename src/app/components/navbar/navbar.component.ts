import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { AuthService } from "src/app/service/authentication/auth.service";
import { User } from "../interface/user";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
  animations: [
    trigger("arrowAnimation", [
      state("collapsed", style({ transform: "rotate(0deg)" })),
      state("expanded", style({ transform: "rotate(180deg)" })),
      transition("collapsed <=> expanded", animate("300ms ease-in-out")),
    ]),
  ],
})
export class NavbarComponent {
  @ViewChild("navbarNavAltMarkup", { static: true })
  navbar!: ElementRef;

  navbarExpanded = false;
  islogged = false;
  user?: User;

  constructor(
    private authService: AuthService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.authService.currentLogUser.subscribe(() => {
      if (this.authService.currentLogUser.getValue().email === "") {
        this.islogged = false;
      } else {
        this.islogged = true;
        this.user = this.authService.currentLogUser.value;
        console.log(this.user);
      }
    });
  }

  hideNavbar(): void {
    if (this.navbar.nativeElement.classList.contains("show")) {
      this.navbar.nativeElement.classList.remove("show");
    }
  }

  toggleNavbar(): void {
    this.navbarExpanded = !this.navbarExpanded;
  }

  logout(): void {
    this.authService.logout();
  }

  dropdownMenu(): void {
    // implementation for dropdownMenu method
  }

  ngOnInit(): void {
    const navbarToggle =
      this.elementRef.nativeElement.querySelector(".navbar-toggler");
    const navbarCollapse = this.elementRef.nativeElement.querySelector(
      "#navbarNavAltMarkup"
    );

    this.renderer.listen("document", "click", (event) => {
      if (
        navbarCollapse.classList.contains("show") &&
        !navbarCollapse.contains(event.target) &&
        event.target !== navbarToggle
      ) {
        navbarToggle.click();
      }
    });
  }
}
