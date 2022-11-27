import { Component } from "@angular/core";
import { ApiService, IApiParam } from "src/app/shared/api/api.service";

@Component({
  templateUrl: './create-blog-component.html',
  styleUrls: ['./create-blog.component.css'],
})
export class CreateBlogComponent{

  constructor(private apiService: ApiService) {}

  markup: string = '';

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement)

    const params: IApiParam = {
      path: 'blog/create',
      data,
      method: "POST",
    };

    this.apiService.request(params);
  }
};
