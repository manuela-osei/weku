import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppRoutingModule, CanActivatePage } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login-module/login/login.component";
import { CreateAccountComponent } from "./login-module/create-account/create-account.component";
import { ForgotPasswordComponent } from "./login-module/forgot-password/forgot-password.component";
import { FillProfileComponent } from "./tabs-module/profile/fill-profile/fill-profile.component";
import { TimelineComponent } from "./tabs-module/timeline/timeline.component";
import { MessageComponent } from "./tabs-module/timeline/message/message.component";
import { AddComponent } from "./tabs-module/tree/add/add.component";
import { JournalComponent } from "./tabs-module/journal/journal.component";
import { TreeComponent } from "./tabs-module/tree/tree.component";
import { ProfileComponent } from "./tabs-module/profile/profile.component";
import { TabsComponent } from "./tabs-module/tabs.component";
import { SettingsComponent } from "./tabs-module/profile/settings/settings.component";
import { AboutComponent } from "./tabs-module/profile/settings/about/about.component";
import { AccountdetailsComponent } from "./tabs-module/profile/settings/accountdetails/accountdetails.component";
import { HelpComponent } from "./tabs-module/profile/settings/help/help.component";
import { SecurityComponent } from "./tabs-module/profile/settings/security/security.component";
import { ThemeComponent } from "./tabs-module/profile/settings/theme/theme.component";

// We need this to send API requests to our server
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AddfeedComponent } from "./tabs-module/timeline/addfeed/addfeed.component";
import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { File } from "@ionic-native/File/ngx";
import { MediaCapture } from "@ionic-native/media-capture/ngx";
import { Media } from "@ionic-native/media/ngx";
import { StreamingMedia } from "@ionic-native/streaming-media/ngx";
import { PhotoViewer } from "@ionic-native/photo-viewer/ngx";
import { RemoveComponent } from "./tabs-module/tree/remove/remove.component";
import { AddtreeComponent } from "./login-module/addTree/addtree.component";
import { CommonModule } from "@angular/common";
import { IonicSelectableModule } from "ionic-selectable";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    ForgotPasswordComponent,
    FillProfileComponent,
    TimelineComponent,
    MessageComponent,
    AddComponent,
    JournalComponent,
    TreeComponent,
    ProfileComponent,
    TabsComponent,
    AddfeedComponent,
    SettingsComponent,
    AboutComponent,
    AccountdetailsComponent,
    HelpComponent,
    SecurityComponent,
    ThemeComponent,
    RemoveComponent,
    AddtreeComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    CommonModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicSelectableModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ImagePicker,
    MediaCapture,
    File,
    Media,
    StreamingMedia,
    PhotoViewer,
    CanActivatePage,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
