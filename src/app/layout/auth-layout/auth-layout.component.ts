import { ChangeDetectorRef, Component, HostBinding, TemplateRef, OnInit, OnDestroy } from "@angular/core";
import { AuthLayoutHeaderComponent } from "./header/header.component";
import { RouterOutlet } from "@angular/router";
import { AuthLayoutFooterComponent } from "./footer/footer.component";
import { AsyncPipe } from "@angular/common";
import { AuthService } from "@/core/services/auth.service";
import { ModalService } from "@/core/services/modal.service";
import { ThemeService } from "@/core/services/theme.service";
import { Subscription } from "rxjs";

@Component({
  templateUrl: "./auth-layout.component.html",
  providers: [AuthService, ModalService, ThemeService],
  imports: [RouterOutlet, AuthLayoutHeaderComponent, AuthLayoutFooterComponent, AsyncPipe]
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

  user$ = this.authService.user$

  modalTemplate: TemplateRef<HTMLElement> | null = null;

  @HostBinding('class')
  hostClass = "flex flex-col h-dvh w-dvw bg-light dark:bg-dark"

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
    this.themeService.init();

    this.modalSub = this.modalService.modalRef$.subscribe(this.onChangeModalTemplate.bind(this))
    this.themeSub = this.themeService.darkMode$.subscribe(this.onChangeThemeMode.bind(this))
  }

  ngOnDestroy() {
    this.modalSub?.unsubscribe();
    this.themeSub?.unsubscribe();
  }
}
