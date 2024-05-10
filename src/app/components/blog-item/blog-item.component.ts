import { Component, Input } from "@angular/core";
import { faBookmark, faCommentDots, faThumbsUp, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { CollapseDirection } from "src/app/constant/app";
import { IBlog } from "src/app/model/blog";

@Component({
  selector: 'blog-item',
  templateUrl: './blog-item.component.html',
  styles: [':host {@apply bg-white flex mx-2 p-4 flex-row rounded-lg;}']
})
export class BlogItemComponent {
  @Input() blog!: IBlog;

  collapsed: boolean = false

  get collapsingDirection() {
    return CollapseDirection.HORIZONTAL;
  }

  toggleCollapse(event: Event) {
    this.collapsed = !this.collapsed;
  }

  faBookmark = faBookmark;
  faCommentDots = faCommentDots;
  faThumbsUp = faThumbsUp;
  faCircleInfo = faCircleInfo;
}
