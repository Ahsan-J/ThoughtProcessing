import { Component, ViewChild, TemplateRef, SimpleChanges, Input, Output, EventEmitter, OnChanges }  from '@angular/core';
import { ModalService } from '@/core/services/modal.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ButtonComponent } from '../button/button.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-modal',
    templateUrl: './model.component.html',
    imports: [ButtonComponent, FaIconComponent, CommonModule]
})
export class ModalComponent implements OnChanges{

  @Input() show = false;
  @Input() class = '';
  @Input() style = '';
  @Input() direction = 'top';

  @ViewChild('container') container!: TemplateRef<HTMLElement>;
  @Output() dismiss = new EventEmitter<MouseEvent>();
  @Output() showChange = new EventEmitter<boolean>();
  @Output() backdrop = new EventEmitter<MouseEvent>();

  faXMark = faXmark;

  constructor(private modalService: ModalService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show']) {
      // this.modalService.showModal(changes['show']?.currentValue ? this.container: null);
    }
  }

  onKeyup() {
    console.log('onKeyup');
  }

  onBackdropPress(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.modalService.showModal(null);
      this.showChange.emit(false);
      this.backdrop.emit(event);
    }
  }

  onDismissPress(event: MouseEvent) {
    this.showChange.emit(false);
    this.dismiss.emit(event);
  }

  get animationClass() {
    switch(this.direction) {
      case "right": return "translate-x-[100rem] translate-y-0";
      case "left": return "-translate-x-[100rem] translate-y-0";
      case "bottom": return "translate-x-0 translate-y-[100rem]";
      case "top":
      default: return "translate-x-0 -translate-y-[100rem]";;
    }
  }

  get modelInnerContainer() {
    return "bg-light dark:bg-dark bg-opacity-80 w-3/4 h-3/4 hide-scrollbar overflow-y-auto overflow-x-hidden flex flex-col relative z-1 transform-x-0 transform-y-0 rounded transition-all px-3 py-1 border-dark dark:border-light border border-solid" + this.animationClass
  }

  showModal(show = this.show) {
    this.modalService.showModal(show ? this.container: null);
  }
}
