import { Component, AfterContentInit, HostListener, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "@/core/services/auth.service";
import { IUser } from "@/core/models/user/user.model";
import { GITHUB, LINKEDIN, STACK_OVERFLOW } from '@/core/constant/color.enum';
import { Subscription } from 'rxjs';
// import { unmarshalFormData } from "@/core/utility/form.util";
import { Router, RouterLink } from "@angular/router";
import { faBell, faPlus, faSearch, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { ThemeService } from "@/core/services/theme.service";
import { ButtonComponent } from "@/shared/components/button/button.component";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { AvatarComponent } from "@/shared/components/avatar/avatar.component";
import { AccountPopupComponent } from "../account-popup/account-popup.component";

interface HeaderMenu {
  label: string,
  link: string,
}

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    providers: [AuthService, ThemeService, Router],
    imports: [ButtonComponent, FaIconComponent, RouterLink, AvatarComponent, AccountPopupComponent]
})
export class AuthLayoutHeaderComponent implements AfterContentInit, OnInit, OnDestroy {
  GITHUB = GITHUB;
  LINKEDIN = LINKEDIN;
  STACK_OVERFLOW = STACK_OVERFLOW;

  faSearch = faSearch;
  faPlus = faPlus;
  faBell = faBell;
  faMoon = faMoon;
  faSun = faSun;

  showPopup = false;
  collapse = true;
  smallWidth = true;

  menu: HeaderMenu[] = [];
  user!: IUser;

  private sub!: Subscription

  constructor(private authService: AuthService, private router: Router, private themeService: ThemeService) {}

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.authService.user$.subscribe(observer => {
      if(observer) this.user = observer;
    })
  }

  @HostListener('window:resize')
  onResize() {
    if(typeof window != "undefined") {
      this.smallWidth = window.innerWidth < 992
    }
  }

  ngAfterContentInit() {
    this.onResize();
  }

  onCollapse() {
    this.collapse = !this.collapse;
  }

  onSearchBlog(event: Event) {
    event.preventDefault();
    // if(event.target instanceof HTMLFormElement) {
    //   const data = unmarshalFormData(new FormData(event.target))
    //   if(data.search) {
    //     this.router.navigate(['/blogs'], {queryParams: data});
    //   }
    // }
  }

  toggleDarkMode() {
    this.themeService.setDarkMode(!this.isDarkMode)
  }

  get isDarkMode() {
    return this.themeService.isDarkMode;
  }
}
