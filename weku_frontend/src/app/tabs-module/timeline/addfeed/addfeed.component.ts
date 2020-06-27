import { Component, OnInit } from "@angular/core";
import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { MediaCapture } from "@ionic-native/media-capture/ngx";
import { StreamingMedia } from "@ionic-native/streaming-media/ngx";
import { PhotoViewer } from "@ionic-native/photo-viewer/ngx";
import { ActionSheetController, Platform, NavController } from "@ionic/angular";
import { MediaFile, CaptureError } from "@ionic-native/media-capture/ngx";
import { File, FileEntry } from "@ionic-native/File/ngx";
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { async } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

const MEDIA_FOLDER_NAME = "my_media"; //to have our own folder

@Component({
  selector: "app-addfeed",
  templateUrl: "./addfeed.component.html",
  styleUrls: ["./addfeed.component.scss"],
})
export class AddfeedComponent implements OnInit {
  files = [];
  title: any;
  img: any;
  description: any;
  videoSrc: any;
  date: any;

  current_user = null; //current user is being set to null

  constructor(
    private imagePicker: ImagePicker,
    private mediaCapture: MediaCapture,
    private file: File,
    private media: Media,
    private streamingMedia: StreamingMedia,
    private photoViewer: PhotoViewer,
    private actionSheetController: ActionSheetController,
    private plt: Platform,
    private router: Router,
    private http: HttpClient,
    public alertController: AlertController,
    public navCtrl: NavController
  ) {
    //current user info called into the local storage set in Json string
    this.current_user = JSON.parse(localStorage.getItem("current_user"));
  }
  ngOnInit(){}

  post() {
    // Send the request to server, if it's successful allow the user to access the timeline
    // Otherwise show error message
    console.log(this.title, this.description);
    
    this.http
      .post(environment.baseURL + "/feeds/" + this.current_user.id,{
        title: this.title,
        description: this.description,
        src: this.img,
        date: this.date,
        vidSrc: this.videoSrc,
      })
      .subscribe(
        (data: any) => {
          console.log(data);
          localStorage.setItem("current_feed", JSON.stringify(data.feeds));
          this.router.navigate(["/tabs/timeline"]);
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
  // presentAlert(message: any) {
  //   throw new Error("Method not implemented.");
  // }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: "Error!",
      subHeader: "",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }


  /////MEDIA/////

  async selectMedia() {
    const actionSheet = await this.actionSheetController.create({
      header: "What would you like to add?",
      buttons: [
        {
          text: "Capture Image",
          handler: () => {
            this.captureImage();
          },
        },
        {
          text: "Record Video",
          handler: () => {
            this.recordVideo();
          },
        },
        {
          text: "Record Audio",
          handler: () => {
            this.recordAudio();
          },
        },
        {
          text: "Load multiple",
          handler: () => {
            this.pickImages();
          },
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ],
    });
    await actionSheet.present();
  }

  // pickImages() {
  //   this.imagePicker.getPictures({ outputType: 1 }).then((results) => {
  //     // for (var i = 0; i < results.length; i++) {
  //       this.img = "data:image/jpeg;base64," + results;
  //       // this.copyFileToLocalDir(results[i]);
  //     //}
  //   });
  // }

  pickImages() {
    // const options: CameraOptions={
    //   quality: 100,
    //   destinationType: this.imagePicker.DestinationType.DATA_URL,
    //   encodingType: this.imagePicker.EncodingType.JPEG,
    //   mediaType: this.imagePicker.MediaType.PICTURE,
    //   sourceType: this.imagePicker.PictureSourceType.PHOTOLIBRARY
    // }

    this.imagePicker.getPictures({ outputType: 1 }).then((imageData) => {
      // for (var i = 0; i < results.length; i++) {
        this.img = "data:image/jpeg;base64," + imageData;
        // this.copyFileToLocalDir(results[i]);
      //}
    }, (err)=>{
      //handle error
    });
  }


  captureImage() {
    this.mediaCapture.captureImage().then(
      (data: MediaFile[]) => {
        if (data.length > 0) {
          //this.copyFileToLocalDir(data[0].fullPath);
        }
      },
      (err: CaptureError) => console.error(err)
    );
  }

  recordAudio() {
    this.mediaCapture.captureAudio().then(
      (data: MediaFile[]) => {
        if (data.length > 0) {
          //this.copyFileToLocalDir(data[0].fullPath);
        }
      },
      (err: CaptureError) => console.error(err)
    );
  }

  recordVideo() {
    this.mediaCapture.captureVideo().then(
      (data: MediaFile[]) => {
        if (data.length > 0) {
          //this.copyFileToLocalDir(data[0].fullPath);
        }
      },
      (err: CaptureError) => console.error(err)
    );
  }

  //last bracket
}
