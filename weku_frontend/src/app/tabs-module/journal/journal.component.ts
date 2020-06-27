import { Component, OnInit } from "@angular/core";
import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { MediaCapture } from "@ionic-native/media-capture/ngx";
import { StreamingMedia } from "@ionic-native/streaming-media/ngx";
import { PhotoViewer } from "@ionic-native/photo-viewer/ngx";
import { ActionSheetController, Platform } from "@ionic/angular";
import { MediaFile, CaptureError } from "@ionic-native/media-capture/ngx";
import { File, FileEntry } from "@ionic-native/File/ngx";
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { async } from "@angular/core/testing";
import { Router } from "@angular/router";

const MEDIA_FOLDER_NAME = "my_media"; //to have our own folder

@Component({
  selector: "app-journal",
  templateUrl: "./journal.component.html",
  styleUrls: ["./journal.component.scss"],
})
export class JournalComponent implements OnInit {
  journaling = [];

  journal = "";

  files = [];

  current_user = null;

  constructor(
    private router: Router,
    private imagePicker: ImagePicker,
    private mediaCapture: MediaCapture,
    private file: File,
    private media: Media,
    private streamingMedia: StreamingMedia,
    private photoViewer: PhotoViewer,
    private actionSheetController: ActionSheetController,
    private plt: Platform
  ) {
    if (localStorage.getItem("journaling")) {
      this.journaling = JSON.parse(localStorage.getItem("journaling"));
    }

    this.current_user = JSON.parse(localStorage.getItem("current_user"));

    

  }

  //to add into journal
  addJournal() {
    this.journaling.push(this.journal);
    localStorage.setItem("journaling", JSON.stringify(this.journaling));
  }

  ngOnInit() {}

  //last bracket
}
