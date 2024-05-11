import { Component, OnInit, TemplateRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './data-store/auth.service';
import { Subscription } from 'rxjs';
import { ModalService } from './components/modal/modal.service';
import { ComponentModule } from './components/component.module';
import { AppRoutingModule } from './routing/app-routing.module';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IUser } from './model/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AppRoutingModule,
    ComponentModule,
    CommonModule,
    FontAwesomeModule,
  ],
  templateUrl: './app.component.html',
  styles: [':host { @apply flex flex-col h-dvh w-dvw bg-light;}'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private modalService: ModalService,
    private cd: ChangeDetectorRef
  ) { }

  private modalSub!: Subscription;

  modalTemplate: TemplateRef<any> | null = null;

  ngOnInit() {
    if (typeof localStorage != 'undefined') {
      let user: IUser = {
        access_token: "",
        created_at: new Date().toISOString(),
        deleted_at: null,
        updated_at: new Date().toISOString(),
        email:"abc123@gmail.com",
        id: "123",
        linkedin: "",
        name: "User Account",
        profile: "https://placehold.co/96",
        role: 1,
        status: 1,
        token_expiry: 86400
      };

      // try {
      //   user = JSON.parse(localStorage.getItem("auth_user") || "null");
      // } catch(e) {
      //   console.error(e)
      // }
      this.authService.setAuthUser(user)
    }

    this.modalSub = this.modalService.modalRef$.subscribe(modalTemplate => {
      this.modalTemplate = modalTemplate;
      this.cd.detectChanges();
    })
  }

  ngOnDestroy() {
    this.modalSub.unsubscribe();
  }
}
