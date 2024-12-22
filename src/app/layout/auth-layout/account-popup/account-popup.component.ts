import { Component, OnInit, OnDestroy } from '@angular/core'
import { AuthService } from '@/core/services/auth.service';
import { IUser } from '@/core/models/user/user.model';
import { Subscription } from 'rxjs';
import { faGear, faCircleUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { NavListItem } from './account-popup.type';
import { AuthApiService } from '@/core/services/api/auth-api.service';
import { ButtonComponent } from '@/shared/components/button/button.component';
import { AvatarComponent } from '@/shared/components/avatar/avatar.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-account-popup',
  templateUrl: './account-popup.component.html',
  providers: [AuthService, AuthApiService],
  imports: [ NgFor, NgIf ,RouterLink, ButtonComponent, AvatarComponent, FaIconComponent]
})
export class AccountPopupComponent implements OnInit, OnDestroy {
  public user!: IUser;
  private sub!: Subscription;

  faPowerOff = faPowerOff;

  public navList: NavListItem[] = [
    {
      route: "/settings",
      icon: faGear,
      title: "Settings"
    },
    {
      route: '/profile',
      icon: faCircleUser,
      title: "My Profile"
    }
  ]

  constructor(private authService: AuthService, private authApiService: AuthApiService) { }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.authService.user$.subscribe(user => {
      if (user) this.user = user;
    })
  }

  onLogout() {
    this.authApiService.logout()
  }
}
