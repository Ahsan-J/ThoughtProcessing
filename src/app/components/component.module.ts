import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CollapseComponent } from "./collapse/collapse.component";
import { IconComponent } from "./icon/icon.component";
import { BlogItemComponent } from "./blog-item/blog-item.component";
import { AvatarComponent } from "./avatar/avatar.component";
import { PopularTagsComponent } from "./popular-tags/popular-tags.component";
import { AppRoutingModule } from "../routing/app-routing.module";
import { RouterModule } from "@angular/router";
import { RandomImageComponent } from "./random-image/random-image.component";
import { FloatingInputComponent } from "./floating-input/floating-input.component";
import { FloatingTextareaComponent } from "./floating-textarea/floating-textarea.component";

const components = [
  CollapseComponent,
  IconComponent,
  BlogItemComponent,
  AvatarComponent,
  PopularTagsComponent,
  RandomImageComponent,
  FloatingInputComponent,
  FloatingTextareaComponent,
]

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
  ],
  declarations: components,
  exports: components,
})
export class ComponentModule{}
