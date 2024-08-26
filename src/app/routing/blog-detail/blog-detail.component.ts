import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs'
import { IBlog } from '../../model/blog';
import { ApiService } from '../../shared/api/api.service';
import { IconDefinition, faBookmark, faCommentDots, faShare, faShareAlt, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { sampleBlogs } from 'src/app/constant/blog';

type BlogAction = {
  action: (event?: MouseEvent) => void,
  icon: IconDefinition,
  text: number | string | null,
}

@Component({
  templateUrl: './blog-detail.component.html',
})
export class BlogDetailComponent implements OnInit, OnDestroy {

  @HostBinding('class')
  hostClass: string = "h-full flex flex-row container w-3/4 self-center gap-2 py-10";

  private sub?: Subscription;
  public blog?: IBlog;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(async params => {
      if (this.blog?.id != params['id']) {
        const blogId = params['id'];
        // const response = await this.apiService.request({
        //   path: `blog/${params['id']}`,
        // });
        this.blog = sampleBlogs.find(b => b.id == blogId);

      }
    })
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  blogActions: Array<BlogAction> = [
    {
      action: async (event) => {
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
      action: async (event) => {
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
      action: async (event) => {
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
      action: async (event) => {
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
