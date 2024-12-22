import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn:'root',
})
export class ModalService {
  private modalSubject = new BehaviorSubject<TemplateRef<HTMLElement> | null>(null);
  public modalRef$ = this.modalSubject.asObservable();

  showModal(modal: TemplateRef<HTMLElement> | null) {
    this.modalSubject.next(modal);
  }
}
