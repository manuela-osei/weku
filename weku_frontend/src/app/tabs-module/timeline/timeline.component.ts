import { Component, OnInit, ViewChildren, QueryList, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import data from './../../../assets/feed.json'
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";




@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})


export class TimelineComponent implements OnInit {
  [x: string]: any;

  title: any;
  img: any;
  description: any;
  date: any;
  feeds;
  videoSrc;


  current_user = null; //current user is being set to null

  


  /////////SET VARIABLES //////
  feed = data; //setting feed data coming from feed.json
  @ViewChildren('player')videoPlayers: QueryList<any>;//videoplaying querylist
  currentPlaying =null; //value to check if currentplaying

  stickyVideo: HTMLVideoElement = null;//stickyvid in html inizially set to null
  stickyPlaying = false;//keep track if sticky is playing for it playbuttons
  @ViewChild('stickyPlayer', {static: false}) stickyPlayer:ElementRef;



  /////Constructor//////
  constructor(private router: Router,private http: HttpClient, ) { 
   

    //current user info called into the local storage set in Json string
    this.current_user = JSON.parse(localStorage.getItem("current_user"));

    this.showPost();
  }
  ngOnInit() {
   
  }

 ////////SET ALL OTHER FUNCTIONS//////////////////////////////////////

// Send the request to server, if it's successful allow the user to access the timeline
    // Otherwise show error message

  showPost(){
    this.http
      .get(environment.baseURL + "/feeds/" + this.current_user.id)
      .subscribe(
        (data: any) => {
          console.log(data);
          localStorage.setItem("current_feed", JSON.stringify(data.feeds));
          this.feeds = data.feeds;
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

  //Presstoadd to add page
  pressAdd()
  {
    console.log("pressAdd called");
    this.router.navigate(['/addfeed']);
  }

  ////////////TIMELINE VIDEO AND SCROLL FUNCTIONS////////////////////

  //Function of whether scrolled or not to choose to play or stop playing
  didScroll()
  {
    //if playing ans in view, end function with return else if 
    //playing and not in view continue did scroll funtion
    if(this.currentPlaying && this.isElementInViewport(this.currentPlaying))
     {
     
      return;
    } 
    else if (this.currentPlaying && !this.isElementInViewport(this.currentPlaying))
    {
      //the item is out of view, pause it
      this.currentPlaying.pause();
      this.currentPlaying = null;
    }

    this.videoPlayers.forEach(player =>{
      console.log('player:', player);

      if(this.currentPlaying)
      {
        return;
      }

      //grab native element
      const nativeElement = player.nativeElement;
      const inView =this.isElementInViewport(nativeElement);

      if(this.stickyVideo && this.stickyVideo.src == nativeElement.src)
      {
        return;
      }

      //check if an item is visible
      if(inView)
      {
        this.currentPlaying = nativeElement;
        this.currentPlaying.muted = false;
        this.currentPlaying.play();
        return;
      }
    });
  }


  //WideVideoScreenFuntion
  openFullscreen(elem: { requestFullScreen: () => void; webkitEnterFullScreen: () => void; enterFullScreen: () => void; })
  {
    //stakeoverflow
    if(elem.requestFullScreen){
      elem.requestFullScreen();
    }
    if(elem.webkitEnterFullScreen){
      elem.webkitEnterFullScreen();
    } 
    if(elem.enterFullScreen){
      elem.enterFullScreen();
    }
  }

  //Function to check whether in view or not
  isElementInViewport(el: { getBoundingClientRect: () => any; })
  {
    const rect = el.getBoundingClientRect();
    return(
      //view length 
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <=  (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  //StickyVideoScreenFunction
  playOnSide(elem)
  {
    if(this.stickyVideo){
      this.renderer.removeChild(this.stickyPlayer.nativeElement, this.stickyVideo)
    }

    this.stickyVideo = elem.cloneNode(true);

    this.renderer.appendChild(this.stickyPlayer.nativeElement, this.stickyVideo);

    if(this.currentPlaying){
      const playPosition = this.currentPlaying.currentTime;
      this.currentPlaying.pause();
      this.currentPlaying = null;
      this.stickyVideo.currentTime = playPosition;
    }

    this.stickyVideo.muted = false;
    this.stickyVideo.play();
    this.stickyPlaying = true;
  }

  //closeSticky
  closeSticky(){
    if(this.stickyVideo)
      {
        this.renderer.removeChild(this.stickyPlayer.nativeElement, this.stickyVideo);
        this.stickyVideo = null;
        this.stickyPlaying = false;
      }
      else
      {
        this.stickyVideo.play();
        this.stickyPlaying = true;
      }
  }

  playOrPauseSticky(){ }

  //last bracket
}

