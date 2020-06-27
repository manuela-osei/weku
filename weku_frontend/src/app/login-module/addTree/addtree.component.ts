import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import {
  ActionSheetController,
  Platform,
  MenuController,
} from "@ionic/angular";
import { ModalController } from "@ionic/angular";
import { environment } from "src/environments/environment";
import { AlertController } from "@ionic/angular";
import { UsersService } from "src/app/helpers/users.service";


@Component({
  selector: "app-addtree",
  templateUrl: "./addtree.component.html",
  styleUrls: ["./addtree.component.scss"],
})

export class AddtreeComponent implements OnInit {

  //declaring properties and their types

  //create
  inputName: string = "";
  inputId: string = "";

  //join
  selectedTreeId: string = "";
  trees: Array<any> = [];

  searchInput: string = "";

  constructor(
    private router: Router,
    private http: HttpClient,
    private actionSheetController: ActionSheetController,
    public modalController: ModalController,
    public menuController: MenuController,
    private userService: UsersService,
    public alertController: AlertController
  ) {
    //not waiting for user input to getting data but
    // you will grab them before used/to call them when on the page
    this.getTrees();
  }

  ngOnInit() {}

  //back to create account
  back() {
    this.router.navigate(["/createAccount"]);
  }

  //join Tree Button
  joinTree() {
    //join

    let current_user = JSON.parse(localStorage.getItem("current_user"));
    this.http
      .post(environment.baseURL + "/user/" + current_user.id, {
        treeId: this.selectedTreeId,
      })
      .subscribe(
        (data: any) => {
          console.log(data);
          // User has been added to the tree
          localStorage.setItem("current_user", JSON.stringify(data.user));
          this.router.navigate(["/tabs/tree"]);
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

  //retrieving trees
  getTrees() {
    this.http.get(environment.baseURL + "/trees").subscribe(
      (data: any) => {
        console.log(data);
        this.trees = data.trees;
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

  //create a new tree
  createNewTree() {
    let current_user = JSON.parse(localStorage.getItem("current_user"));
    //create
    let dataToSend = {
      name: this.inputName,
      id: this.inputId,
      user_id: current_user.id,
    };

    // Send the request to server, if it's successful allow the user to access the timeline
    // Otherwise show error message
    this.http.post(environment.baseURL + "/create-tree", dataToSend).subscribe(
      (data: any) => {
        console.log(data);

        this.selectedTreeId = this.inputId;
        this.joinTree();
        this.router.navigate(["/tabs/tree"]);
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

  //Search Input and Filter
  treesSearch: any;
  searchFilter() {
    this.treesSearch = this.trees.filter((tree) => {
      return tree.id.indexOf(this.selectedTreeId) >= 0;
    });

    console.log(this.selectedTreeId, this.treesSearch);
  }

  //last bracket
}
