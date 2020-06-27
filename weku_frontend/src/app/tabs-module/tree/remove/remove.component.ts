import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UsersService } from "src/app/helpers/users.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AlertController } from "@ionic/angular"; //all alert system

@Component({
  selector: "app-remove",
  templateUrl: "./remove.component.html",
  styleUrls: ["./remove.component.scss"],
})
export class RemoveComponent implements OnInit {
  constructor(
    private router: Router,
    private usersService: UsersService,
    private http: HttpClient,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  //last bracket
}
