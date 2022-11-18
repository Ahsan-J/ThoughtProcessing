import { HostBinding, Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn:'root',
})
export class ModalService {
  private modalSubject = new BehaviorSubject<TemplateRef<any> | null>(null);
  public modalRef$ = this.modalSubject.asObservable();

  showModal(modal: TemplateRef<any> | null) {
    this.modalSubject.next(modal);
  }
}
