import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService{

  private darkThemeSubject = new BehaviorSubject<boolean>(false);
  public darkMode$ = this.darkThemeSubject.asObservable();
  private darkThemeIdentifier = "dark-theme"

  setDarkMode(isDark: boolean) {
    this.darkThemeSubject.next(isDark);
  }

  init() {

    if(typeof window !== 'undefined') {
      let systemPreferenceIsDark = window.matchMedia("(prefers-color-scheme:dark)").matches;

      const savedValue = localStorage.getItem(this.darkThemeIdentifier)
      if(typeof savedValue == "string") systemPreferenceIsDark = savedValue == this.darkThemeIdentifier
      const selectedSetting = document.querySelector("body")?.dataset?.['mode'];
      this.setDarkMode(selectedSetting ? (selectedSetting == "dark"): systemPreferenceIsDark);
    }

    this.saveThemeSpecification()
  }

  saveThemeSpecification() {
    if(typeof window !== 'undefined') {
      this.darkThemeSubject.subscribe((darkMode) => {
        if(darkMode) localStorage.setItem(this.darkThemeIdentifier, this.darkThemeIdentifier)
          else localStorage.setItem(this.darkThemeIdentifier, "")
      })
    }
  }

  get isDarkMode() {
    return this.darkThemeSubject.getValue()
  }
}
