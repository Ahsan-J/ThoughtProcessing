import { Component, OnInit, TemplateRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './data-store/auth.service';
import { Subscription } from 'rxjs';
import { ModalService } from './components/modal/modal.service';
import { ComponentModule } from './components/component.module';
import { AppRoutingModule } from './routing/app-routing.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AppRoutingModule,
    ComponentModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
      this.authService.setAuthUser(JSON.parse(localStorage.getItem("auth_user") || "null"))
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
