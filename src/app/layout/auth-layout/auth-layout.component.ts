import { ChangeDetectorRef, Component, HostBinding, TemplateRef, OnInit, OnDestroy } from "@angular/core";
import { AuthLayoutHeaderComponent } from "./header/header.component";
import { RouterOutlet } from "@angular/router";
import { AuthLayoutFooterComponent } from "./footer/footer.component";
import { NgTemplateOutlet } from "@angular/common";
import { AuthService } from "@/core/services/auth.service";
import { ModalService } from "@/core/services/modal.service";
import { ThemeService } from "@/core/services/theme.service";
import { Subscription } from "rxjs";
import { IUser } from "@/core/models/user/user.model";

@Component({
  selector: "app-auth-layout",
  templateUrl: "./auth-layout.component.html",
  providers: [AuthService, ModalService, ThemeService],
  imports: [RouterOutlet, NgTemplateOutlet, AuthLayoutHeaderComponent, AuthLayoutFooterComponent]
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private modalService: ModalService,
    private themeService: ThemeService,
    private cd: ChangeDetectorRef
  ) { }

  private modalSub?: Subscription;
  private themeSub?: Subscription;

  modalTemplate: TemplateRef<HTMLElement> | null = null;

  @HostBinding('class')
  hostClass = "flex flex-col h-dvh w-dvw bg-light dark:bg-dark"

  loadSavedUserData() {
    if (typeof localStorage != 'undefined') {
      const user: IUser = {
        access_token: "",
        createdAt: new Date(),
        deletedAt: null,
        updatedAt: new Date(),
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

  onChangeModalTemplate(modalTemplate: TemplateRef<HTMLElement> | null) {
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
}
