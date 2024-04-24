import { Component, Input, Output, EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { ColorSchemes } from 'src/app/model/app';
import { IDropdownItem } from './dropdown.types';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  @Input() defaultKey?: string;
  @Input() options: { [key: string]: IDropdownItem } = {};
  @Input() renderSelectedValue?: TemplateRef<any>;
  @Input() placeholder?: string;
  @Input() name?: string;
  @Input() label?: string;
  @Input() type?: ColorSchemes;
  @Input() iconName?: IconDefinition;
  @Input() outline?: boolean;
  @Input() disabled?: boolean;
  @Input() value?: string;
  @Input() block?: boolean;
  @Input() error?: string;
  @Output() click = new EventEmitter<{key: string, value: IDropdownItem}>();
  // @Input() renderItem?: (value: IDropdownItem, key: string) => React.ReactElement;

  showClass: boolean = false;
  selectedKey: string = "";
  errorText: string = "";

  ngOnInit() {
    const firstKey = Object.keys(this.options).shift();
    this.selectedKey = this.defaultKey || firstKey || this.selectedKey;
  }

  onItemClick(key: string, value: IDropdownItem) {
    this.showClass = false;
    this.click.emit({key, value})
  }
};
