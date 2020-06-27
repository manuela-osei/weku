import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { AlertController } from "@ionic/angular";
import { UsersService } from 'src/app/helpers/users.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})

export class LoginComponent implements OnInit {
  splash = true;

  email: string = "";
  password: string = "";

  //call router in constructor
  constructor(private router: Router, private http: HttpClient, private userService: UsersService, public alertController: AlertController) {}

///timing to view welcome page
  ionViewDidLoad() {
    setTimeout(() => {
      this.splash = false;
    }, 500);
  }

  //Callbacks
  ngOnInit() {}

  //ButtonsNavigations

  //login button navigate
  loginPress() {

    // Send the request to server, if it's successful allow the user to access the timeline
    // Otherwise show error message
    this.http
      .post(environment.baseURL + "/login", {
        email: this.email,
        password: this.password,
      })
      .subscribe(
        (data:any) => {
          console.log(data.user);
          //store i information of user to not loose info after logout
          localStorage.setItem("current_user", JSON.stringify(data.user));
          this.router.navigate(["/tabs/timeline"]);
        },
        (responseError) => {

          try {
            this.userService.presentAlert(responseError.error.message);
          } catch (e) {
            this.userService.presentAlert(
              "Please check your internet connection, or try again in a few minutes."
            );
          }
        }
      );
  }

  //show alert
  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: "Error!",
      subHeader: "",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  //createAccount button navigate
  createAccountPress() {
    this.router.navigate(["/createAccount"]);
  }

  //forgotpassword button navigate
  forgotPasswordPress() {
    this.router.navigate(["/forgotPassword"]);
  }

  doSomething() {
    console.log("Do something clicked");
  }

  //last bracket
}
