import { Routes } from "@angular/router";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { ProfileComponent } from "./profile/profile.component";

export const settingRoutes: Routes = [
  {
    path: 'edit-profile',
    title: "EditProfile",
    component: EditProfileComponent,
  },
  {
    path: 'profile',
    title: "Profile",
    component: ProfileComponent
  }
]
