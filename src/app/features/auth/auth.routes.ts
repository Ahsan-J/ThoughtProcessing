import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";

export const authRoutes: Routes = [
  {
    path: 'login',
    title: "Login",
    component: LoginComponent,
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
]
