import { Component, ViewChild, TemplateRef, SimpleChanges, Input, ChangeDetectorRef, AfterContentChecked, HostBinding, Output, EventEmitter }  from '@angular/core';
import { ModalService } from './modal.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'modal',
  templateUrl: './model.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent{

  @Input() show: boolean = false;
  @Input() class: string = '';
  @Input() style: string = '';
  @Input() direction: string = 'top';

  @ViewChild('container') container!: TemplateRef<any>;
  @Output() onDismiss = new EventEmitter<MouseEvent>();
  @Output() showChange = new EventEmitter<boolean>();
  @Output() onBackdrop = new EventEmitter<MouseEvent>();

  faXMark = faXmark;

  constructor(private modalService: ModalService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show']) {
      // this.modalService.showModal(changes['show']?.currentValue ? this.container: null);
    }
  }

  onBackdropPress(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.modalService.showModal(null);
      this.showChange.emit(false);
      this.onBackdrop.emit(event);
    }
  }

  onDismissPress(event: MouseEvent) {
    this.showChange.emit(false);
    this.onDismiss.emit(event);
  }

  get animationClass() {
    switch(this.direction) {
      case "right": return "transformRight ";
      case "left": return "transformLeft ";
      case "bottom": return "transformBottom ";
      case "top":
      default: return "transformTop ";
    }
  }

  showModal(show = this.show) {
    this.modalService.showModal(show ? this.container: null);
  }
}
