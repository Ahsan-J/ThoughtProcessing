import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { AuthService } from 'src/app/data-store/auth.service';
import { IUser } from 'src/app/model/user';
import { Subscription } from 'rxjs';
import { ApiService, IApiParam } from 'src/app/shared/api/api.service';

type NavListItem = {
  route?: string;
  action?: (e: MouseEvent) => void;
  title?: string;
  icon: string;
}

@Component({
  selector: 'account-popup',
  templateUrl: './account-popup.component.html',
  styleUrls: ['./account-popup.component.css']
})
export class AccountPopupComponent implements OnInit, OnDestroy {
  @Input() public show: boolean = false;
  public user!: IUser;
  private sub!: Subscription;

  public navList: Array<NavListItem> = [
    {
      route: "/settings",
      icon: "gear",
      title: "Settings"
    },
    {
      route: '/profile',
      icon: "person-circle",
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
