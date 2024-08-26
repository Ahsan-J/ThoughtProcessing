import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkThemeSubject = new BehaviorSubject<boolean>(true);
  public darkMode$ = this.darkThemeSubject.asObservable();

  setDarkMode(isDark: boolean) {
    this.darkThemeSubject.next(isDark);
  }

  loadFallbackSystemTheme() {
    const systemPreferenceIsDark = window.matchMedia("(prefers-color-scheme:dark)").matches;
    const selectedSetting = document.querySelector("body")?.dataset?.['mode'];
    this.setDarkMode(selectedSetting ? (selectedSetting == "dark"): systemPreferenceIsDark);
  }
}
