import { Component, HostBinding, Input } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { faBookmark, faCommentDots, faThumbsUp, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { CollapseDirection } from "@/core/constant/app.enum";
import { IBlog } from "@/core/models/blog/blog.model";
import { ButtonComponent } from "@/shared/components/button/button.component";
import { AvatarComponent } from "@/shared/components/avatar/avatar.component";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'app-blog-item',
    templateUrl: './blog-item.component.html',
    imports: [ButtonComponent,AvatarComponent, FaIconComponent, RouterLink, DatePipe]
})
export class BlogListItemComponent {
  @Input() blog?: IBlog;

  @HostBinding('class')
  hostClass = "bg-white dark:bg-dark flex mx-2 p-4 flex-row rounded-lg"

  get containerClass(): string {
    return 'px-2 relative h-full ' + this.collapsed ? 'flex-1': 'flex-[0.75]'
  }

  onKeydown() {
    // TODO:
  }

  constructor(private router: Router) { }

  collapsed = false

  get collapsingDirection() {
    return CollapseDirection.HORIZONTAL;
  }

  toggleCollapse() {
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
