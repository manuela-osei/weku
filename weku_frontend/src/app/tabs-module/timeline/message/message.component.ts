import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {

  constructor(private router: Router){}

  ngOnInit() {}

}

//ButtonsNavigations

  //login button navigate
  //loginPress(){
 //   this.router.navigate(['/timeline'])
 // }