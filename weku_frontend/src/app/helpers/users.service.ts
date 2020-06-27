import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(
    private router: Router,
    private http: HttpClient,
    public alertController: AlertController
  ) {}

  //ionic alert being used to call in error
  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: "Error!",
      subHeader: "",
      message: message,
      buttons: ["OK"],
    });

    await alert.present();
  }

  //know current users
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("current_user"));
  }

  createUser(user) {
    // Send the request to server, if it's successful allow the user to access the timeline
    // Otherwise show error message
    return this.http.post(environment.baseURL + "/sign-up", {
      username: user.username,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
    });
  }

  updateUser(user) {
    //update
    // Send the request to server, if it's successful allow the user to access the timeline
    // Otherwise show error message
    return this.http.post(environment.baseURL + "/user/" + user.id, user);
  }

  deleteUser(user) {
    //delete
    return this.http.post(environment.baseURL + "/user/" + user.id, user);
  }

  getUsers() {
    //getusers
    return this.http.get(environment.baseURL + "/users");
  }

  //last bracket
}
