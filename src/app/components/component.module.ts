import { ProfileCardComponent } from './profile-card/profile-card.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CollapseComponent } from "./collapse/collapse.component";
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
import { BadgeComponent } from './badge/badge.component';
import { AutoCompleteComponent } from './autocomplete/autocomplete.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ButtonComponent } from './button/button.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AccountPopupComponent } from './account-popup/account-popup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownItemFilterPipe } from './autocomplete/dropdownFilter.pipe';

const components = [
  CollapseComponent,
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
  DropdownItemFilterPipe,
  MDTextEditor,
  MarkdownDirective,
  BadgeComponent,
  AutoCompleteComponent,
  DropdownComponent,
  ButtonComponent,
  SpinnerComponent,
  HeaderComponent,
  FooterComponent,
  AccountPopupComponent,
]

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FontAwesomeModule,
  ],
  declarations: components,
  exports: components,
})
export class ComponentModule{}
