import { Component, Input } from "@angular/core";
import { IBlog } from "src/app/model/blog";

@Component({
  selector: 'blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css'],
})
export class BlogItemComponent {
  @Input() blog!: IBlog;
}
