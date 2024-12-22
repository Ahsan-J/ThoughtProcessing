import { NgClass, NgIf } from '@angular/common';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'app-floating-input',
    templateUrl: './floating-input.component.html',
    imports: [FaIconComponent, NgClass, NgIf, ButtonComponent]
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
  // @Output() change = new EventEmitter<Event>();
  @Output() inputKeydown = new EventEmitter<KeyboardEvent>();
  @Output() inputFocus = new EventEmitter<FocusEvent>();
  @Output() inputBlur = new EventEmitter<FocusEvent>();

  faEyeSlash = faEyeSlash;
  faEye = faEye;

  onValueChange(event: Event) {
    this.valueChange.emit((event.target as HTMLInputElement)?.value)
    // this.change.emit(event)
  }

  @Output() iconClick = new EventEmitter<MouseEvent>();

  showSecureText = false;

  @Input() defaultValue = '';

  get labelClass(): string {
    return `relative flex flex-row [&_*]:box-border [&:focus-within>span]:text-primary [&:focus-within>span]:translate-y-0 [&:focus-within>span]:pl-0 items-baseline ${this.errorText ? 'border-danger': ''}`.trim()
  }

  get combinedInputClass(): string {
    let style = 'w-full px-0 py-2 pl-2 mt-6 border border-solid border-gray-500 rounded outline-none placeholder:opacity-0 [&:not(:placeholder-shown)+span]:text-primary [&:not(:placeholder-shown)+span]:translate-y-0 [&:not(:placeholder-shown)+span]:pl-0 bg-transparent text-dark dark:text-light'

    if(this.errorText) {
      style = `${style} border-danger`;
    }

    if(this.placeholder) {
      style = `${style} focus:placeholder:opacity-1`;
    }

    if(this.inputClass) {
      style = `${style} ${this.inputClass}`
    }

    return style;
  }

  ngOnInit() {
    this.id = this.id || nanoid();
  }

  onIconClick(event: MouseEvent){
    this.iconClick.emit(event);
  }

  onFocus(event: FocusEvent) {
    this.inputFocus.emit(event);
  }

  onBlur(event: FocusEvent) {
    this.inputBlur.emit(event);
  }

  onKeyDown(event: KeyboardEvent) {
    this.inputKeydown.emit(event);
  }
};
