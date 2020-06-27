import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  //ButtonsNavigations

  //creating account button navigate
  sendToEmailPress() {
    this.router.navigate(["/"]);
  }

  //back to login button navigate
  backLogin() {
    this.router.navigate(["/login"]);
  }

  //LAST BRACKET
}
