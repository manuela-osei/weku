import { Injectable, Inject, Renderer2, RendererFactory2 } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);

    let isEnableDark = JSON.parse(localStorage.getItem("enableDark"));
    if (isEnableDark) {
      this.enableDark();
    } else {
      this.enableLight();
    }
  }

  //themeServices enabled theme
  //dark theme enable
  enableDark() {
    //in local storage remember to store settings
    localStorage.setItem("enableDark", "true");
    //renderer to override the root theme
    this.renderer.addClass(this.document.body, "dark-theme");
  }

  //disenable the dark theme to show the light theme
  enableLight() {
    //in local storage remember to store settings
    localStorage.setItem("enableDark", "false");
    //remove override theme color
    this.renderer.removeClass(this.document.body, "dark-theme");
  }

  //last bracket
}
