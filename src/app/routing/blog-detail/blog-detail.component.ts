import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs'
import { IBlog } from '../../model/blog';
import { ApiService, IApiParam } from '../../shared/api/api.service';
import { IconDefinition, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { sampleBlogs } from 'src/app/constant/blog';
import { MarkdownDirective } from './markdown.directive';

type BlogAction = {
  action: (event?: MouseEvent) => void,
  icon: IconDefinition,
  count: number,
}

@Component({
  templateUrl: './blog-detail.component.html',
  styles: [':host { @apply flex flex-row container w-3/4 self-center gap-2 py-10 overflow-y-auto overflow-x-hidden;}']
})
export class BlogDetailComponent implements OnInit, OnDestroy{

  private sub?: Subscription;
  public blog?: IBlog;

  constructor(private route: ActivatedRoute, private apiService: ApiService){}

  ngOnInit() {
    this.sub = this.route.params.subscribe(async params => {
      if(this.blog?.id != params['id']) {
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
      count: 10,
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
      count: 10,
      icon: faThumbsUp,
    },
  ];
}
