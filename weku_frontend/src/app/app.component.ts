import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //platform is ready and plugins are available
      //Here all higher Native work can be done

      if(this.platform.is("cordova")) {
        this.statusBar.overlaysWebView(false);
      }

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //timer to execute this component when the time runs up
     // timer(3000).subscribe(() => this.showSplash = false)
    });
  }

  createAlert(){
    
  }
}
