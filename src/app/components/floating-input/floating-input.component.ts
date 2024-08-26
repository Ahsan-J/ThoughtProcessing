import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { IconDefinition, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';

@Component({
  selector: 'floating-input',
  templateUrl: './floating-input.component.html'
})
export class FloatingInputComponent implements OnInit {

  @Input() id?: string;
  @Input() name?: string;
  @Input() inputClass?: string = '';
  @Input() label?: string = '';
  @Input() htmlType?: HTMLInputElement['type'] = "text";
  @Input() errorText?: string = '';
  @Input() placeholder?: string = '';
  @Input() iconName?: IconDefinition;
  @Input() value?: string = '';
  @Input() disabled?: boolean;
  @Output() valueChange = new EventEmitter<string>();
  @Output() keydown = new EventEmitter<KeyboardEvent>();

  faEyeSlash = faEyeSlash;
  faEye = faEye;

  onValueChange(event: Event) {
    this.valueChange.emit((event.target as HTMLInputElement)?.value)
  }

  @Output() iconClick = new EventEmitter<MouseEvent>();

  showSecureText: boolean = false;

  @Input() defaultValue: string = '';

  ngOnInit() {
    this.id = this.id || nanoid();
  }

  onIconClick(event: MouseEvent){
    this.iconClick.emit(event);
  }


};
