import { Component, ElementRef, OnChanges, ViewChild } from "@angular/core";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { IDropdownItem } from "src/app/components/dropdown/dropdown.types";
import { BlogStatus } from "src/app/model/blog";
import { ApiService, IApiParam } from "src/app/shared/api/api.service";

@Component({
    templateUrl: './create-blog-component.html',
    standalone: false
})
export class CreateBlogComponent implements OnChanges{

  @ViewChild('formRef') formRef!: ElementRef<any>;

  constructor(private apiService: ApiService) { }

  markup: string = "## Hello";
  bannerImage: File | null = null;
  faImage = faImage;
  options?: { [key: string]: IDropdownItem } = {
    "programming": { label: "Programming" },
    "writing": { label: "Writing" },
  };

  tags: {[key in string]: IDropdownItem} = {};

  ngOnChanges() {
    console.log(this.markup)
  }

  get selectedTagKeys() {
    return Object.keys(this.tags)
  }

  onSelectingItem(event: any, key: string, item: IDropdownItem) {
    this.tags[key] = item
  }

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
