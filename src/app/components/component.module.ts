import { ProfileCardComponent } from './profile-card/profile-card.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CollapseComponent } from "./collapse/collapse.component";
import { IconComponent } from "./icon/icon.component";
import { BlogItemComponent } from "./blog-item/blog-item.component";
import { AvatarComponent } from "./avatar/avatar.component";
import { PopularTagsComponent } from "./popular-tags/popular-tags.component";
import { RouterModule } from "@angular/router";
import { RandomImageComponent } from "./random-image/random-image.component";
import { FloatingInputComponent } from "./floating-input/floating-input.component";
import { FloatingTextareaComponent } from "./floating-textarea/floating-textarea.component";
import { NavbarListComponent } from "./navbar-list/navbar-list.component";
import { TabComponent } from "./tab/tab.component";
import { ImageCropperComponent } from "./image-cropper/image-cropper.component";
import { ModalComponent } from "./modal/modal.component";
import { ResizeableContainerComponent } from "./resizeable-container/resizeable-container.component";
import { CreateObjectURLPipe } from "./image-cropper/createObjectURL.pipe";
import { MDTextEditor } from "./md-text-editor/md-text-editor.component";
import { MarkdownDirective } from "../routing/blog-detail/markdown.directive";

const components = [
  CollapseComponent,
  IconComponent,
  BlogItemComponent,
  AvatarComponent,
  PopularTagsComponent,
  RandomImageComponent,
  FloatingInputComponent,
  FloatingTextareaComponent,
  NavbarListComponent,
  TabComponent,
  ImageCropperComponent,
  ModalComponent,
  ResizeableContainerComponent,
  ProfileCardComponent,
  CreateObjectURLPipe,
  MDTextEditor,
  MarkdownDirective,
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
