import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthService } from '@/core/services/auth.service';
import { IUser } from '@/core/models/user/user.model';
import { ApiService } from '@/core/services/api/api.service';
import { IBlog } from '@/core/models/blog/blog.model';
import { RandomImageComponent } from '@/shared/components/random-image/random-image.component';
import { AvatarComponent } from '@/shared/components/avatar/avatar.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from '@/shared/components/button/button.component';
import { TabComponent } from '@/shared/components/tab/tab.component';

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    providers: [AuthService],
    imports: [
      RandomImageComponent,
      AvatarComponent,
      FaIconComponent,
      ButtonComponent,
      TabComponent,
    ]
})
export class ProfileComponent implements OnDestroy {
  sub!: Subscription;
  user?: IUser;
  authUser?: IUser;
  blogs: IBlog[] = [];
  faPlus = faPlus;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,
  ){
    this.authService.user$.subscribe(user => {
      if(user && !this.user) {
        this.user = user
      };
      if(user && !this.authUser) {
        this.authUser = user
      };
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // ngOnInit() {
  //   // this.sub = this.route.params.subscribe(async params => {
  //   //   if(this.user?.id != params['id']) {
  //   //     const response = await this.apiService.request({
  //   //       path: `user/${params['id'] || this.user?.id}`,
  //   //     });
  //   //     this.user = response.data;
  //   //   }
  //   // })
  // }

};
