import { Component, AfterContentInit, HostListener, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { IUser } from "src/app/model/user";
import { GITHUB, LINKEDIN, STACK_OVERFLOW } from '../../shared/color';
import { Subscription } from 'rxjs';
import { unmarshalFormData } from "src/app/shared/utility";
import { Router } from "@angular/router";
import { faBell, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

type HeaderMenu = {
  label: string,
  link: string,
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements AfterContentInit, OnInit, OnDestroy {
  GITHUB = GITHUB;
  LINKEDIN = LINKEDIN;
  STACK_OVERFLOW = STACK_OVERFLOW;

  faSearch = faSearch;
  faPlus = faPlus;
  faBell = faBell;

  showPopup:boolean = false;
  collapse: boolean = true;
  smallWidth: boolean = true;

  menu: Array<HeaderMenu> = [];
  user!: IUser;

  private sub!: Subscription

  constructor(private authService: AuthService, private router: Router) {}

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

  onCollapse(event: MouseEvent) {
    this.collapse = !this.collapse;
  }

  onSearchBlog(event: Event) {
    event.preventDefault();
    if(event.target instanceof HTMLFormElement) {
      const data = unmarshalFormData(new FormData(event.target))
      if(data.search) {
        this.router.navigate(['/blogs'], {queryParams: data});
      }
    }
  }
}
