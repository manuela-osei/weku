import { NgModule, Injectable } from "@angular/core";
import {
  PreloadAllModules,
  RouterModule,
  Routes,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { IonicSelectableModule } from "ionic-selectable";
//<!--********************************-->
//<!---------------MYCODE--------------->
//<!--********************************-->
//Import Pages and pathways
import { LoginComponent } from "./login-module/login/login.component";
import { CreateAccountComponent } from "./login-module/create-account/create-account.component";
import { ForgotPasswordComponent } from "./login-module/forgot-password/forgot-password.component";
import { FillProfileComponent } from "./tabs-module/profile/fill-profile/fill-profile.component";
import { MessageComponent } from "./tabs-module/timeline/message/message.component";
import { AddComponent } from "./tabs-module/tree/add/add.component";
import { TimelineComponent } from "./tabs-module/timeline/timeline.component";
import { TabsComponent } from "./tabs-module/tabs.component";
import { JournalComponent } from "./tabs-module/journal/journal.component";
import { TreeComponent } from "./tabs-module/tree/tree.component";
import { ProfileComponent } from "./tabs-module/profile/profile.component";
import { AddfeedComponent } from "./tabs-module/timeline/addfeed/addfeed.component";
import { SettingsComponent } from "./tabs-module/profile/settings/settings.component";
import { AboutComponent } from "./tabs-module/profile/settings/about/about.component";
import { AccountdetailsComponent } from "./tabs-module/profile/settings/accountdetails/accountdetails.component";
import { HelpComponent } from "./tabs-module/profile/settings/help/help.component";
import { SecurityComponent } from "./tabs-module/profile/settings/security/security.component";
import { ThemeComponent } from "./tabs-module/profile/settings/theme/theme.component";
import { RemoveComponent } from "./tabs-module/tree/remove/remove.component";
import { AddtreeComponent } from "./login-module/addTree/addtree.component";

//injectable for canActivate to redirect back when false and login detain not found in local storage
@Injectable({
  providedIn: "root",
})
export class CanActivatePage implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //local storage store
    console.log("canActivate called");
    try {
      if (JSON.parse(localStorage.getItem("current_user"))) {
        return true;
      }
    } catch (e) {}

    // not logged in so redirect to login page with the return url
    this.router.navigate(["/login"]);
    return false;
  }
}

//setroutesnamesforurl
const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "createAccount", component: CreateAccountComponent },
  { path: "forgotPassword", component: ForgotPasswordComponent },
  { path: "fillProfile", component: FillProfileComponent },
  { path: "message", component: MessageComponent },
  { path: "add", component: AddComponent },
  { path: "remove", component: RemoveComponent },
  { path: "addfeed", component: AddfeedComponent },
  { path: "addtree", component: AddtreeComponent },
  { path: "settings", component: SettingsComponent },
  { path: "about", component: AboutComponent },
  { path: "accountdetails", component: AccountdetailsComponent },
  { path: "help", component: HelpComponent },
  { path: "settings", component: SettingsComponent },
  { path: "security", component: SecurityComponent },
  { path: "theme", component: ThemeComponent },
  { path: "addfeed", component: AddfeedComponent },
  {
    path: "tabs",
    component: TabsComponent,
    canActivate: [CanActivatePage],
    children: [
      {
        path: "timeline",
        component: TimelineComponent,
      },
      {
        path: "journal",
        component: JournalComponent,
      },
      {
        path: "tree",
        component: TreeComponent,
      },
      {
        path: "profile",
        component: ProfileComponent,
      },
    ],
  },
  {
    path: "**",
    redirectTo: "tabs/timeline",
    pathMatch: "full",
    canActivate: [CanActivatePage],
  },
  //any path that is not valid redirect to timeline
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    IonicSelectableModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
