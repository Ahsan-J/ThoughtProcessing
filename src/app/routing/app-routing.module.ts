import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BlogListComponent } from './blogs/blogs.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { ComponentModule } from '../components/component.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ApiModule } from '../shared/api/api.module';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export const routes: Routes = [
  {
    path: 'blogs',
    title: "Blog",
    component: BlogListComponent,
  },
  {
    path: '',
    title: "Home",
    redirectTo: 'blogs',
    pathMatch: 'full',
    // component: HomeComponent,
  },
  {
    path: 'about',
    title: "About",
    component: AboutComponent,
  },
  {
    path: 'blog/create',
    title: "CreateBlog",
    component: CreateBlogComponent,
  },
  {
    path: 'blog/:id',
    title: "BlogDetail",
    component: BlogDetailComponent,
  },
  {
    path: 'login',
    title: "Login",
    component: LoginComponent,
  },
  {
    path: 'profile',
    title: "Profile",
    component: ProfileComponent,
  },
  {
    path: 'edit-profile',
    title: "EditProfile",
    component: EditProfileComponent,
  },
  {
    path: 'register',
    title: "CreateAccount",
    component: SignupComponent,
  },
  {
    path: 'forgot',
    title: "Forgot",
    component: ForgotPasswordComponent,
  },
];

@NgModule({
  declarations:[
    HomeComponent,
    BlogListComponent,
    AboutComponent,
    BlogDetailComponent,
    ProfileComponent,
    EditProfileComponent,
    SignupComponent,
    ForgotPasswordComponent,
    LoginComponent,
    CreateBlogComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    ApiModule,
    FontAwesomeModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
