import { Routes } from "@angular/router";
import { BlogListComponent } from "./blog-list/blogs.component";
import { BlogDetailComponent } from "./blog-detail/blog-detail.component";

export const blogRoutes: Routes = [
  {
    path: '',
    title: "BlogListing",
    component: BlogListComponent,
  },
  {
    path: ':id',
    title: "BlogDetail",
    component: BlogDetailComponent
  }
]
