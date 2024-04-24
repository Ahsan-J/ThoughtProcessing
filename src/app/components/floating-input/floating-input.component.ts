import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { IconDefinition, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';

@Component({
  selector: 'floating-input',
  templateUrl: './floating-input.component.html',
  styleUrls: ['./floating-input.component.css'],
})
export class FloatingInputComponent implements OnInit {

  @Input() id: string = '';
  @Input() labelClass?: string = '';
  @Input() name?: string;
  @Input() inputClass?: string = '';
  @Input() label?: string = '';
  @Input() htmlType?: HTMLInputElement['type'] = "text";
  @Input() errorText?: string = '';
  @Input() placeholder?: string = '';
  @Input() iconName?: IconDefinition;
  @Input() value?: string = '';
  @Output() valueChange = new EventEmitter<string>();

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
