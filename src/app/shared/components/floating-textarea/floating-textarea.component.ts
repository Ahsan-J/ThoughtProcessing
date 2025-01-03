import { Component, Input, OnInit } from '@angular/core';
import { nanoid } from 'nanoid';

@Component({
    selector: 'app-floating-textarea',
    templateUrl: './floating-textarea.component.html',
    styleUrls: ['./floating-textarea.component.css'],
})
export class FloatingTextareaComponent implements OnInit {
  @Input() id = '';
  @Input() labelClass?: string = '';
  @Input() name?: string;
  @Input() inputClass?: string = '';
  @Input() label?: string = '';
  @Input() errorText?: string = '';
  @Input() placeholder?: string = '';
  @Input() defaultValue = '';
  @Input() rows: string | number = 5;

  ngOnInit() {
    this.id = this.id || nanoid();
  }
};
