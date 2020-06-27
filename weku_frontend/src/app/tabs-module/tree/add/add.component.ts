import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UsersService } from "src/app/helpers/users.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AlertController } from "@ionic/angular"; //all alert system

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent implements OnInit {
  users;

  selectedRelationship = "";
  selectedUserID = "";

  current_user = null;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private http: HttpClient,
    public alertController: AlertController
  ) {
    this.current_user = JSON.parse(localStorage.getItem("current_user"));

    // this.users = yourService.getUsers();

    this.http.get(environment.baseURL + "/users").subscribe(
      (data: any) => {
        // Get all the users from the server;
        this.users = data.users;

        // Filter the array of users, and remove myself from the list
        this.users = this.users.filter((user) => {
          return user.id !== this.current_user.id;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {}

  //return current 
  getCurrentUser() {
    return this.current_user;
  }
  // add member
  addMember() {
    let selectedRelationship = (document.getElementById(
      "selectedRelationship"
    ) as any).value;
    let selectedUserID = (document.getElementById("selectedUserID") as any)
      .value;

    // Run the check to avoid repetition
    /*let user = this.getCurrentUser();
    for(let key in user){
      if(key == "siblings"){
        if(key["siblings"].includes(selectedUserID)){
          //remove index from array 
        }
      }else  if(key == selectedUserID && (key == "mother" || key == "father" || key == "wife" || key == "husband")){
        key = "";
      }
    }*/

    //check whether a sibling for more
    if (
      selectedRelationship == "mother" ||
      selectedRelationship == "father" ||
      selectedRelationship == "wife" ||
      selectedRelationship == "husband"
    ) {
      this.getCurrentUser()[selectedRelationship] = selectedUserID;
    } else if (selectedRelationship == "children") {
      if (!this.getCurrentUser().hasOwnProperty("children")) {
        this.getCurrentUser()["children"] = [];
      }
      this.getCurrentUser()["children"].push(selectedUserID);
    } else {
      this.getCurrentUser()["siblings"].push(selectedUserID);
    }

    // Send request and update user info
    console.log(this.getCurrentUser());

    this.http
      .post(
        environment.baseURL + "/user/" + this.current_user.id,
        this.getCurrentUser()
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          localStorage.setItem("current_user", JSON.stringify(data.user));
          this.router.navigate(["/tabs/tree"]);
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
  presentAlert(message: any) {
    throw new Error("Method not implemented.");
  }

  

  codeSelected() {
    console.log(this.selectedUserID);
  }

  //last bracket
}
