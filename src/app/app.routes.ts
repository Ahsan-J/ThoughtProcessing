import { Routes } from '@angular/router';
import { AboutComponent } from './features/about/about.component';
import { blogRoutes } from './features/blog/blog.routes';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { authRoutes } from './features/auth/auth.routes';
import { settingRoutes } from './features/setting/setting.routes';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: 'blogs',
    title: "Blog",
    component: AuthLayoutComponent,
    children: blogRoutes
  },
  {

    path: '',
    title: "Home",
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: 'about',
    title: "About",
    component: AboutComponent,
  },
  {
    path: 'auth',
    title: "Auth",
    component: AuthLayoutComponent,
    children: authRoutes
  },
  {
    path: 'setting',
    title: "Setting",
    component: AuthLayoutComponent,
    children: settingRoutes
  },
];
