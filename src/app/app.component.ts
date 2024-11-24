import { Component, OnInit, TemplateRef, OnDestroy, ChangeDetectorRef, HostBinding } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { ModalService } from './components/modal/modal.service';
import { ComponentModule } from './components/component.module';
import { AppRoutingModule } from './routing/app-routing.module';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IUser } from './model/user';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [
    AppRoutingModule,
    ComponentModule,
    CommonModule,
    FontAwesomeModule,
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private modalService: ModalService,
    private themeService: ThemeService,
    private cd: ChangeDetectorRef
  ) { }

  private modalSub?: Subscription;
  private themeSub?: Subscription;

  modalTemplate: TemplateRef<any> | null = null;

  loadSavedUserData() {
    if (typeof localStorage != 'undefined') {
      let user: IUser = {
        access_token: "",
        createdAt: new Date().toISOString(),
        deletedAt: null,
        updatedAt: new Date().toISOString(),
        email: "abc123@gmail.com",
        id: "123",
        linkedin: "",
        name: "User Account",
        profile: "https://placehold.co/96",
        role: 1,
        token_expiry: 86400
      };

      // try {
      //   user = JSON.parse(localStorage.getItem("auth_user") || "null");
      // } catch(e) {
      //   console.error(e)
      // }
      this.authService.setAuthUser(user)
    }
  }

  onChangeThemeMode(isDarkMode: boolean) {
    if (typeof window !== "undefined") {
      document.body?.setAttribute("data-mode", isDarkMode ? "dark" : "light")
      this.cd.detectChanges();
    }
  }

  onChangeModalTemplate(modalTemplate: TemplateRef<any> | null) {
    this.modalTemplate = modalTemplate;
    this.cd.detectChanges();
  }

  ngOnInit() {
    this.loadSavedUserData();
    this.themeService.init();
    this.modalSub = this.modalService.modalRef$.subscribe(this.onChangeModalTemplate.bind(this))
    this.themeSub = this.themeService.darkMode$.subscribe(this.onChangeThemeMode.bind(this))
  }

  ngOnDestroy() {
    this.modalSub?.unsubscribe();
    this.themeSub?.unsubscribe();
  }

  @HostBinding('class')
  hostClass: string = "flex flex-col h-dvh w-dvw bg-light dark:bg-dark"
}
