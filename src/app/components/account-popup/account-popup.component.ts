import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/model/user';
import { Subscription } from 'rxjs';
import { ApiService, IApiParam } from 'src/app/shared/api/api.service';
import { IconDefinition, faGear, faCircleUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';

type NavListItem = {
  route?: string;
  action?: (e: MouseEvent) => void;
  title?: string;
  icon: IconDefinition;
}

@Component({
    selector: 'account-popup',
    templateUrl: './account-popup.component.html',
    styleUrls: ['./account-popup.component.css'],
    standalone: false
})
export class AccountPopupComponent implements OnInit, OnDestroy {
  public user!: IUser;
  private sub!: Subscription;

  faPowerOff = faPowerOff;

  public navList: Array<NavListItem> = [
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

  constructor(private authService: AuthService, private apiService: ApiService) { }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.authService.user$.subscribe(user => {
      if (user) this.user = user;
    })
  }

  async onLogout(event: MouseEvent) {

    const params : IApiParam =  {
      path: 'auth/logout',
      method: "POST",
    };

    await this.apiService.request(params);
    this.authService.setAuthUser(null);
  }
}
