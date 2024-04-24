import { Component, Input } from "@angular/core";
import { faBookmark, faCommentDots, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { IBlog } from "src/app/model/blog";

@Component({
  selector: 'blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css'],
})
export class BlogItemComponent {
  @Input() blog!: IBlog;

  faBookmark = faBookmark;
  faCommentDots = faCommentDots;
  faThumbsUp = faThumbsUp;
}
