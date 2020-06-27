import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-fill-profile",
  templateUrl: "./fill-profile.component.html",
  styleUrls: ["./fill-profile.component.scss"],
})
export class FillProfileComponent implements OnInit {
  //declaring properties and their types
  gender: string = "";
  name: string = "";
  lastName: string = "";
  dateOfBirth: Date;
  placeOfBirth: string = "";
  countryOfOrigin: string = "";
  currentNationality: string = "";
  

  current_user = null; //current user is being set to null

  constructor(
    private router: Router,
    private http: HttpClient,
    public alertController: AlertController
  ) {
    //current user info called into the local storage set in Json string
    this.current_user = JSON.parse(localStorage.getItem("current_user"));

    //if properties are set for if there is an input for property call it if not leave it
    this.gender = this.current_user.gender ? this.current_user.gender : "";
    this.name = this.current_user.name ? this.current_user.name : "";
    this.lastName = this.current_user.lastName
      ? this.current_user.lastName
      : "";
    this.dateOfBirth = this.current_user.dateOfBirth
      ? this.current_user.dateOfBirth
      : "";
    this.placeOfBirth = this.current_user.placeOfBirth
      ? this.current_user.placeOfBirth
      : "";
    this.countryOfOrigin = this.current_user.countryOfOrigin
      ? this.current_user.countryOfOrigin
      : "";
    this.currentNationality = this.current_user.currentNationality
      ? this.current_user.currentNationality
      : "";
  }

  ngOnInit() {}

  //ButtonsNavigations
  //creating account button navigate
  next() {
    // Send the request to server, if it's successful allow the user to access the timeline
    // Otherwise show error message
    this.http
      .post(environment.baseURL + "/user/" + this.current_user.id, {
        gender: this.gender,
        name: this.name,
        lastName: this.lastName,
        dateOfBirth: this.dateOfBirth,
        placeOfBirth: this.placeOfBirth,
        countryOfOrigin: this.countryOfOrigin,
        currentNationality: this.currentNationality,
      })
      .subscribe(
        (data: any) => {
          console.log(data);
          localStorage.setItem("current_user", JSON.stringify(data.user));
          this.router.navigate(["/tabs/profile"]);
        },
        (responseError) => {
          try {
            this.presentAlert(responseError.error.message);
          } catch (e) {
            this.presentAlert(
              "Please check your internet connection, or try again in a few minutes."
            );
          }
        }
      );
  }

  //ionic-alert to call on alert when saved
  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: "Error!",
      subHeader: "",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  //back to login button navigate
  skip() {
    this.router.navigate(["/tabs/profile"]);
  }

  //last bracket
}
