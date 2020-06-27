import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(private router: Router ) { }

  ngOnInit() {}

  account(){
    this.router.navigate(['/accountdetails'])
  }

  themeColor(){
    this.router.navigate(['/theme'])
  }

  policies(){
    this.router.navigate(['/security'])
  }

  help(){
    this.router.navigate(['/help'])
  }

  about(){
    this.router.navigate(['/about'])
  }

  logout(){
    //logout
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  //last bracket
}
