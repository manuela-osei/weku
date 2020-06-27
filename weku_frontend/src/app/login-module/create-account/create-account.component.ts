import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AlertController } from "@ionic/angular";
import { UsersService } from 'src/app/helpers/users.service';

@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.component.html",
  styleUrls: ["./create-account.component.scss"],
})
export class CreateAccountComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UsersService,
    public alertController: AlertController
  ) {}

  //calling all ngModels and declaring properties
  username: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";

  ngOnInit() {}

  //ButtonsNavigations

  //funtion called when btn pressed
  accountCreatedPress() {
    // Send the request to server, if it's successful allow the user to access the timeline
    // Otherwise show error message
    this.http
      .post(environment.baseURL + "/sign-up", {
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      })
      .subscribe(
        (data:any) => {
          console.log(data);
          localStorage.setItem('current_user', JSON.stringify(data.user));
          this.router.navigate(["/addtree"]);
        },
        (responseError) => {
          //error called from webserver
          //if statement through the error properties to narrow down to the error in the webserver
          /*if(responseError && responseError.error && responseError.error.message){
            this.presentAlert(responseError.error.message);
          }else{
            this.presentAlert("");
          }*/
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
  backLogin() {
    this.router.navigate(["/login"]);
  }

  //last bracket
}
