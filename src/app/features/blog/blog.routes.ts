import { Routes } from "@angular/router";
import { BlogListComponent } from "./blog-list/blogs.component";
import { BlogDetailComponent } from "./blog-detail/blog-detail.component";
import { CreateBlogComponent } from "./create-blog/create-blog.component";

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
  },
  {
    path:'create',
    title: "CreateBlog",
    component: CreateBlogComponent
  }
]
