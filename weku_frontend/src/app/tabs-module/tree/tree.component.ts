import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UsersService } from "src/app/helpers/users.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

// xdeclare let myTree: any;

@Component({
  selector: "app-tree",
  templateUrl: "./tree.component.html",
  styleUrls: ["./tree.component.scss"],
})
export class TreeComponent implements OnInit {
  constructor(
    private router: Router,
    private usersService: UsersService,
    public http: HttpClient
  ) {
    console.log((window as any).myTree);

    //timer set to wait for the canvas to be loaded before
    setTimeout(() => {
      this.loadTreeData();
    }, 500);
  }

  ngOnInit() {}

  //press to add page
  pressAdd() {
    console.log("pressAdd called");
    this.router.navigate(["/add"]);
  }
  //press to remove page
  pressRemove() {
    this.router.navigate(["/remove"]);
  }

  //press to message page
  pressMessage() {
    this.router.navigate(["/message"]);
  }

  //press to add a new tree page
  pressAddTree() {
    console.log("pressAdd called");
    this.router.navigate(["/addtree"]);
  }

  //function to load database
  async loadTreeData(dataFromDatabase?) {
    // Format the data coming from the database to the Tree library
    this.http.get(environment.baseURL + "/users").subscribe((data: any) => {
      let current_user = JSON.parse(localStorage.getItem("current_user"));

      console.log(data.users);
      dataFromDatabase = data.users;
      let dictionary: any = {};

      dataFromDatabase.forEach((user) => {
        // Does the user exits in the dictionary
        if (!dictionary[user.id]) {
          // No
          dictionary[user.id] = {};
        }
        // Merge all the properties into a single object
        dictionary[user.id] = { ...dictionary[user.id], ...user };

        if (user.wife) {
          // Does the wife exits in the dictionary
          if (!dictionary[user.wife]) {
            // No
            dictionary[user.wife] = {
              children: {},
            };
          }
          dictionary[user.wife].treeId = user.treeId;
          dictionary[user.wife].husband = user.id;
          dictionary[user.wife].gender = "female";
        }

        if (user.husband) {
          // Does the wife exits in the dictionary
          if (!dictionary[user.husband]) {
            // No
            dictionary[user.husband] = {
              children: {},
            };
          }
          dictionary[user.husband].treeId = user.treeId;
          dictionary[user.husband].wife = user.id;
          dictionary[user.husband].gender = "male";
        }

        if (user.father) {
          // Does the father exits in the dictionary
          if (!dictionary[user.father]) {
            // No
            dictionary[user.father] = {
              children: {},
            };
          }
          dictionary[user.father].treeId = user.treeId;
          dictionary[user.father].wife = user.mother;
          dictionary[user.father].gender = "male";
          dictionary[user.father].children[user.id] = true;
        }

        if (user.mother) {
          // Does the father exits in the dictionary
          if (!dictionary[user.mother]) {
            // No
            dictionary[user.mother] = {
              children: {},
            };
          }
          dictionary[user.mother].treeId = user.treeId;
          dictionary[user.mother].husband = user.father;
          dictionary[user.mother].gender = "female";
          dictionary[user.mother].children[user.id] = true;
        }

        if (user.siblings && user.siblings.length > 0) {
          user.siblings.forEach((id) => {
            if (!dictionary[id]) {
              dictionary[id] = {};
            }
            dictionary[id].treeId = user.treeId;
            dictionary[id].father = user.father;
            dictionary[id].mother = user.mother;

            //pushing of siblings/children id
            if (!dictionary[user.father]) {
              dictionary[user.father] = {
                children: {},
              };
            }
            if (!dictionary[user.mother]) {
              dictionary[user.mother] = {
                children: {},
              };
            }
            dictionary[user.father].children[id] = true;
            dictionary[user.mother].children[id] = true;
          });
        }

        if (user.children && user.children.length > 0) {
          user.children.forEach((id) => {
            if (!dictionary[id]) {
              dictionary[id] = {};
            }
            dictionary[id].treeId = user.treeId;
            if (user.gender == "male") {
              dictionary[id].father = user.id;
              if (user.wife) {
                dictionary[id].mother = user.wife;
              }
            } else {
              dictionary[id].mother = user.id;
              if (user.husband) {
                dictionary[id].father = user.husband;
              }
            }
          });
        }
      });

      console.log(dictionary);

      // Convert the dictionary into an array
      let dictionaryToArray = Object.keys(dictionary).map((key) => {
        return dictionary[key];
      });
      dataFromDatabase = dictionaryToArray;
      dataFromDatabase = dataFromDatabase.filter((user) => {
        return user.treeId == current_user.treeId;
      });

      let myTreeData = [];
      for (let i = 0; i < dataFromDatabase.length; i++) {
        let user = dataFromDatabase[i];

        if (user.gender == "female") {
          user.gender = "F";
        } else if (user.gender == "male") {
          user.gender = "M";
        } else {
          user.gender = "M";
        }

        let obj: any = {
          key: user.id,
          n: user.name ? user.name : user.username,
          s: user.gender,
          a: ["C", "F", "K"],
        };

        if (user.father) {
          obj.f = user.father;
        }

        if (user.mother) {
          obj.m = user.mother;
        }

        if (user.wife) {
          obj.ux = user.wife;
        }
        myTreeData.push(obj);
      }

      // We are overriding the variable used in the go js library.
      // window.something > it can be seen as a global variable
      (window as any).myTreeData = myTreeData;

      console.log(myTreeData);

      // Pass the data to the tree library -GOJS LIBRARY ARRAY
      /*(window as any).myTreeData = [
        { key: 0, n: "Aaron", s: "M", m: -10, f: -11, ux: 1, a: ["C", "F", "K"] },
        { key: 1, n: "Alice", s: "F", m: -12, f: -13, a: ["C", "F", "K"] },
        { key: 2, n: "Bob", s: "M", m: 1, f: 0, a: ["C", "F", "K"] },
        { key: 6, n: "Claire", s: "F", m: 1, f: 0, a: ["C", "F", "K"] },
        { key: 7, n: "Carol", s: "F", m: 1, f: 0, a: ["C", "F", "K"] }];*/

      // "Aaron"'s ancestors
      /*{ key: -10, n: "Paternal Grandfather", s: "M", m: -33, f: -32, ux: -11, a: ["A", "S"] },
        { key: -11, n: "Paternal Grandmother", s: "F", a: ["E", "S"] },
        { key: -32, n: "Paternal Great", s: "M", ux: -33, a: ["F", "H", "S"] },
        { key: -33, n: "Paternal Great", s: "F", a: ["S"] },
        { key: -40, n: "Great Uncle", s: "M", m: -33, f: -32, a: ["F", "H", "S"] },
        { key: -41, n: "Great Aunt", s: "F", m: -33, f: -32, a: ["B", "I", "S"] },
        { key: -20, n: "Uncle", s: "M", m: -11, f: -10, a: ["A", "S"] },*/

      // "Alice"'s ancestors
      /*{ key: -12, n: "Maternal Grandfather", s: "M", ux: -13, a: ["D", "L", "S"] },
        { key: -13, n: "Maternal Grandmother", s: "F", m: -31, f: -30, a: ["H", "S"] },
        { key: -21, n: "Aunt", s: "F", m: -13, f: -12, a: ["C", "I"] },
        { key: -22, n: "Uncle", s: "M", ux: -21 },
        { key: -23, n: "Cousin", s: "M", m: -21, f: -22 },
        { key: -30, n: "Maternal Great", s: "M", ux: -31, a: ["D", "J", "S"] },
        { key: -31, n: "Maternal Great", s: "F", m: -50, f: -51, a: ["B", "H", "L", "S"] },
        { key: -42, n: "Great Uncle", s: "M", m: -30, f: -31, a: ["C", "J", "S"] },
        { key: -43, n: "Great Aunt", s: "F", m: -30, f: -31, a: ["E", "G", "S"] },
        { key: -50, n: "Maternal Great Great", s: "F", ux: -51, a: ["D", "I", "S"] },
        { key: -51, n: "Maternal Great Great", s: "M", a: ["B", "H", "S"] }*/
      //]

      (window as any).myTree();
    });
  }

  //last bracket
}
