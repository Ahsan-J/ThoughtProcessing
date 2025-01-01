import { Component, Input, Output, EventEmitter, OnInit, TemplateRef, HostBinding } from '@angular/core';
import { ColorSchemes } from '@/core/types/pagination.type';
import { IDropdownItem } from './dropdown.types';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ButtonComponent } from '../button/button.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { KeyValuePipe } from '@angular/common';

const VariantLabelClasses: Record<ColorSchemes, string> = {
  "primary": `!text-primary`,
  "secondary": "text-secondary",
  "warning": "text-warning",
  "success": "text-success",
  "info": "text-info",
  "light": "text-light",
  "dark": "text-dark",
  "danger": `text-danger`,
  "link": ``,
  "link-inverse": ``,
}

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    imports: [ButtonComponent, FaIconComponent, KeyValuePipe]
})
export class DropdownComponent implements OnInit {
  @Input() defaultKey?: string;
  @Input() options?: Record<string, IDropdownItem>;
  @Input() renderSelectedValue?: TemplateRef<HTMLElement>;
  @Input() placeholder?: string;
  @Input() name?: string;
  @Input() label?: string;
  @Input() type?: ColorSchemes = "primary";
  @Input() iconName?: IconDefinition;
  @Input() outline?: boolean;
  @Input() disabled?: boolean;
  @Input() value?: string;
  @Input() block?: boolean;
  @Input() error?: string;
  @Input() errorText = "";

  @Output() clickItem = new EventEmitter<{key: string, value: IDropdownItem}>();
  // @Input() renderItem?: (value: IDropdownItem, key: string) => React.ReactElement;

  showClass = false;
  selectedKey = "";

  ngOnInit() {
    const firstKey = Object.keys(this.options || {}).shift();
    this.selectedKey = this.defaultKey || firstKey || this.selectedKey;
  }

  onItemClick(key: string, value: IDropdownItem) {
    this.showClass = false;
    this.clickItem.emit({key, value})
  }

  onItemKeydown() {
    // TODO:
  }

  @HostBinding('class')
  componentClass = "relative inline";

  get dropdownContentClass(): string {
    return `absolute bg-light dark:bg-dark w-full overflow-auto shadow z-10 p-0 max-h-[15rem] ${this.showClass ? "block" :"hidden"}`;
  }

  get buttonClass(): string {
    return `${this.label ? 'mt-1': ''} ${this.errorText ? 'border-danger': ''}`
  }

  get labelClass(): string {
    return `text-sm py-1 text-dark dark:text-light transition-all ${this.showClass ? VariantLabelClasses[this.type || 'primary']: ''}`;
  }
};
