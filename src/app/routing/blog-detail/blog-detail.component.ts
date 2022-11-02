import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs'
import { IBlog } from '../../model/blog';
import { ApiService, IApiParam } from '../../shared/api/api.service';
import { MarkdownDirective } from './markdown.directive';

type BlogAction = {
  action: (event?: MouseEvent) => void,
  icon: string,
  count: number,
}

@Component({
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
  // imports:[MarkdownDirective],
})
export class BlogDetailComponent implements OnInit, OnDestroy{

  private blogId!: IBlog['id'];
  private sub!: Subscription;
  public blog!: IBlog | undefined;
  constructor(private route: ActivatedRoute, private apiService: ApiService){}

  ngOnInit() {
    this.sub = this.route.params.subscribe(async params => {
      if(this.blogId != params['id']) {
        this.blogId = params['id'];
        const response = await this.apiService.request({
          path: `blog/${params['id']}`,
        });
        this.blog = response.data;
      }
    })
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  blogActions: Array<BlogAction> = [
    {
      action: async (event) => {
        const params: IApiParam = {
          path: `blog/${this.blogId}/like`,
          method: "POST",
        }
        await this.apiService.request(params);
      },
      count: 10,
      icon: 'hand-thumbs-up'
    }
  ];
}
