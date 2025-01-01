import { Component, ElementRef, OnChanges, ViewChild } from "@angular/core";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { ApiService } from "@/core/services/api/api.service";
import { IDropdownItem } from "@/shared/components/dropdown/dropdown.types";
import { BlogStatus } from "@/core/constant/blog.enum";
import { ButtonComponent } from "@/shared/components/button/button.component";
import { TabComponent } from "@/shared/components/tab/tab.component";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { FloatingInputComponent } from "@/shared/components/floating-input/floating-input.component";
import { AutoCompleteComponent } from "@/shared/components/autocomplete/autocomplete.component";
import { MDTextEditorComponent } from "@/shared/components/md-text-editor/md-text-editor.component";
import { CreateObjectURLPipe } from "@/shared/pipe/create-object-url.pipe";

@Component({
    templateUrl: './create-blog-component.html',
    imports: [
      AutoCompleteComponent,
      ButtonComponent,
      TabComponent,
      FaIconComponent,
      FloatingInputComponent,
      MDTextEditorComponent,
      CreateObjectURLPipe,
    ]
})
export class CreateBlogComponent implements OnChanges{

  @ViewChild('formRef') formRef!: ElementRef<HTMLFormElement>;

  constructor(private apiService: ApiService) { }

  markup = "## Hello";
  bannerImage: File | null = null;
  faImage = faImage;
  options?: Record<string, IDropdownItem> = {
    "programming": { label: "Programming" },
    "writing": { label: "Writing" },
  };

  tags: Record<string, IDropdownItem> = {};

  ngOnChanges() {
    console.log(this.markup)
  }

  get selectedTagKeys() {
    return Object.keys(this.tags)
  }

  onSelectingItem(key: string, item: IDropdownItem) {
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
    // const params: IApiParam = {
    //   path: 'v1/blog/create',
    //   data,
    //   method: "POST",
    // };

    // this.apiService.request(params);
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
