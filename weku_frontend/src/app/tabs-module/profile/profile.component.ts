import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { MediaCapture } from "@ionic-native/media-capture/ngx";
import { StreamingMedia } from "@ionic-native/streaming-media/ngx";
import { PhotoViewer } from "@ionic-native/photo-viewer/ngx";
import { ActionSheetController, Platform } from "@ionic/angular";
import { MediaFile, CaptureError } from "@ionic-native/media-capture/ngx";
import { File, FileEntry } from "@ionic-native/File/ngx";
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


const MEDIA_FOLDER_NAME = "my_media"; //to have our own folder

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  files = [];

  //declaring properties and their types for user profile
  gender: string = "";
  name: string = "";
  lastName: string = "";
  dateOfBirth: any;
  placeOfBirth: string = "";
  countryOfOrigin: string = "";
  currentNationality: string = "";

  //declaring properties and their types for user profile
  members;

  //-------------------------------------
  ngOnInit() {}
  cover;
  

  //USER PROFILE RETRIEVED

  //current user info called into the local storage set in Json string
  current_user = JSON.parse(localStorage.getItem("current_user"));
  current_tree = JSON.parse(localStorage.getItem("tree_members"));

  dp = this. current_user.src;

  categories = ["profile", "relatives", "lifestory"];

  siblings: any;
  mother: any;
  father: any;
  wife: any;
  husband: any;
  children: any;

  constructor(
    private router: Router,
    private imagePicker: ImagePicker,
    private mediaCapture: MediaCapture,
    private file: File,
    private media: Media,
    private streamingMedia: StreamingMedia,
    private photoViewer: PhotoViewer,
    private actionSheetController: ActionSheetController,
    private plt: Platform,
    private http: HttpClient
    ) {
    //if properties are set for if there is an input for property call it if not leave it
    this.gender = this.current_user.gender ? this.current_user.gender : "";
    this.name = this.current_user.name ? this.current_user.name : "";
    this.lastName = this.current_user.lastName
      ? this.current_user.lastName
      : "";
    this.dateOfBirth = this.current_user.dateOfBirth
      ? this.current_user.dateOfBirth
      : "";
     this.dateOfBirth = (new Date(this.dateOfBirth)).toUTCString();
    this.placeOfBirth = this.current_user.placeOfBirth
      ? this.current_user.placeOfBirth
      : "";
    this.countryOfOrigin = this.current_user.countryOfOrigin
      ? this.current_user.countryOfOrigin
      : "";
    this.currentNationality = this.current_user.currentNationality
      ? this.current_user.currentNationality
      : "";

      console.log( "tree" + this.current_user.siblings);

      //tree
      
      this.http.get(environment.baseURL + "/users").subscribe((data: any) => {
        let dictionary = {};
        for(let i = 0; i < data.users.length; i++){
          let user = data.users[i];
          dictionary[user.id] = user;
        }

        if(this.current_user.siblings){
          this.siblings = [];
          this.current_user.siblings.forEach(id => {
            this.siblings.push(dictionary[id]);
          });
        }
        if(this.current_user.children){
          this.children = [];
          this.current_user.children.forEach(id => {
            this.children.push(dictionary[id]);
          });
        }
        if(this.current_user.mother){
          this.mother = dictionary[this.current_user.mother];
        }
        if(this.current_user.mother){
          this.father = dictionary[this.current_user.father];
        }
        if(this.current_user.mother){
          this.wife = dictionary[this.current_user.wife];
        }
        if(this.current_user.mother){
          this.husband = dictionary[this.current_user.husband];
        }


        console.log(this.mother);

      });

    this.name = this.current_user.name ? this.current_user.name : "";
    this.lastName = this.current_user.lastName
      ? this.current_user.lastName
      : "";
    this.dateOfBirth = this.current_user.dateOfBirth
      ? this.current_user.dateOfBirth
      : "";

  }
   
  //to picking Img from file for cover 
  pickImages() {
    this.imagePicker.getPictures({outputType: 1}).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.cover = "data:image/jpeg;base64," + results[i];
        console.log(this.cover);
        // this.copyFileToLocalDir(results[i]);
      }
    });
  }

  //to picking Img from file for prof
  pickProfImages(){
    this.imagePicker.getPictures({outputType: 1}).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.dp = "data:image/jpeg;base64," + results[i];
        console.log(this.dp);
        // this.copyFileToLocalDir(results[i]);
      }
    });
  }

  //settings function to call page
  settings() {
    this.router.navigate(["/settings"]);
  }

  fillProfile() {
    this.router.navigate(["/fillProfile"]);
  }

  //last bracket
}
