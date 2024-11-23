import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { IBlog } from 'src/app/model/blog';
import { IUser } from 'src/app/model/user';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    standalone: false
})
export class ProfileComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  user?: IUser;
  authUser?: IUser;
  blogs: Array<IBlog> = [];
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

  ngOnInit() {
    this.sub = this.route.params.subscribe(async params => {
      if(this.user?.id != params['id']) {
        const response = await this.apiService.request({
          path: `user/${params['id'] || this.user?.id}`,
        });
        this.user = response.data;
      }
    })
  }

};
