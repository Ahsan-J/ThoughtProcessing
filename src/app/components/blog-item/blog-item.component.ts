import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { faBookmark, faCommentDots, faThumbsUp, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { CollapseDirection } from "src/app/constant/app";
import { IBlog } from "src/app/model/blog";

@Component({
  selector: 'blog-item',
  templateUrl: './blog-item.component.html',
  styles: [':host {@apply bg-white flex mx-2 p-4 flex-row rounded-lg;}']
})
export class BlogItemComponent {
  @Input() blog?: IBlog;

  constructor(private router: Router) { }

  collapsed: boolean = false

  get collapsingDirection() {
    return CollapseDirection.HORIZONTAL;
  }

  toggleCollapse(event: Event) {
    this.collapsed = !this.collapsed;
  }

  navigateToBlogDetail() {
    this.router.navigate(['/blog', this.blog?.id], )
  }

  faBookmark = faBookmark;
  faCommentDots = faCommentDots;
  faThumbsUp = faThumbsUp;
  faCircleInfo = faCircleInfo;
}
