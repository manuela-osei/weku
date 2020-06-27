import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/helpers/theme.service'; //theme service to call in methods of theme

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
})


export class ThemeComponent implements OnInit {

  constructor(private theme: ThemeService) { }

//Functions called to enable theme
//dark
  enableDark(){
    this.theme.enableDark();
  }
  //light
  enableLight(){
    this.theme.enableLight();
  }

  ngOnInit() {}

  //last bracket
}