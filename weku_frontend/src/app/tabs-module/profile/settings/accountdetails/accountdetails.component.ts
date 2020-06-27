import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-accountdetails',
  templateUrl: './accountdetails.component.html',
  styleUrls: ['./accountdetails.component.scss'],
})
export class AccountdetailsComponent implements OnInit {

  //declaring properties and their types
  email : string = "";
  password : string = "";
  gender: string = "";
  name: string = "";
  lastName: string = "";
  dateOfBirth: Date;
  placeOfBirth: string = "";
  countryOfOrigin: string = "";
  currentNationality: string = "";

  //current user info called into the local storage set in Json string
  current_user = JSON.parse(localStorage.getItem("current_user"));



  constructor(private router: Router) { 

    //if properties are set for if there is an input for property call it if not leave it
    this.email = this.current_user.email;
    this.password = this.current_user.password;
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

  //last bracket
}
