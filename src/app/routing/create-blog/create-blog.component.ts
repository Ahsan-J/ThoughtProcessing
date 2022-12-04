import { Component, ElementRef, ViewChild } from "@angular/core";
import { BlogStatus } from "src/app/model/blog";
import { ApiService, IApiParam } from "src/app/shared/api/api.service";

@Component({
  templateUrl: './create-blog-component.html',
  styleUrls: ['./create-blog.component.css'],
})
export class CreateBlogComponent {

  @ViewChild('formRef') formRef!: ElementRef<any>;

  constructor(private apiService: ApiService) { }

  markup: string = '';
  bannerImage: File | null = null;

  onFileChange(e: Event) {
    const file = (e.target as HTMLInputElement | null)?.files?.[0];

    if (file) {
      this.bannerImage = file;
    }
  }

  createBlog(data: FormData) {
    data.append('content', this.markup);
    const params: IApiParam = {
      path: 'blog/create',
      data,
      method: "POST",
    };

    this.apiService.request(params);
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement)
    this.createBlog(data);
  }

  onSaveBlog() {
    if(this.formRef.nativeElement instanceof HTMLFormElement) {
      const data = new FormData(this.formRef.nativeElement as HTMLFormElement)
      data.append('status', BlogStatus.Draft.toString())
      this.createBlog(data)
    }
  }
};
