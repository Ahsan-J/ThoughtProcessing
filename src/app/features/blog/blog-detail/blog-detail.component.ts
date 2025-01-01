import { Component, OnDestroy, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs'
import { IBlog } from '@/core/models/blog/blog.model';
import { ApiService } from '@/core/services/api/api.service';
import { IconDefinition, faBookmark, faCommentDots, faShareAlt, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { ButtonComponent } from '@/shared/components/button/button.component';
import { AvatarComponent } from '@/shared/components/avatar/avatar.component';
import { DatePipe } from '@angular/common';

interface BlogAction {
  action: (event?: MouseEvent) => void,
  icon: IconDefinition,
  text: number | string | null,
}

@Component({
  templateUrl: './blog-detail.component.html',
  providers: [],
  imports: [ButtonComponent, AvatarComponent, DatePipe]
})
export class BlogDetailComponent implements OnDestroy {

  @HostBinding('class')
  hostClass = "h-full flex flex-row container w-3/4 self-center gap-2 py-10";

  private sub?: Subscription;
  public blog?: IBlog;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  // ngOnInit() {
  //   // this.sub = this.route.params.subscribe(async params => {
  //   //   if (this.blog?.id != params['id']) {
  //   //     const response = await this.apiService.request({
  //   //       path: `v1/blog/${params['id']}`,
  //   //     });
  //   //     this.blog = response.data
  //   //   }
  //   // })
  // }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  blogActions: BlogAction[] = [
    {
      action: async () => {
        // const params: IApiParam = {
        //   path: `blog/${this.blog?.id}/like`,
        //   method: "POST",
        // }
        // await this.apiService.request(params);
      },
      text: 10,
      icon: faThumbsUp,
    },
    {
      action: async () => {
        // const params: IApiParam = {
        //   path: `blog/${this.blog?.id}/like`,
        //   method: "POST",
        // }
        // await this.apiService.request(params);
      },
      text: 10,
      icon: faCommentDots,
    },
    {
      action: async () => {
        // const params: IApiParam = {
        //   path: `blog/${this.blog?.id}/like`,
        //   method: "POST",
        // }
        // await this.apiService.request(params);
      },
      text: null,
      icon: faBookmark,
    },
    {
      action: async () => {
        // const params: IApiParam = {
        //   path: `blog/${this.blog?.id}/like`,
        //   method: "POST",
        // }
        // await this.apiService.request(params);
      },
      text: null,
      icon: faShareAlt,
    },
  ];
}
