import { Component, Input, Output, EventEmitter, TemplateRef } from "@angular/core";
import { nanoid } from "nanoid";
import { ColorSchemes } from "src/app/model/app";
import { IDropdownItem } from "../dropdown/dropdown.types";

@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css', '../floating-input/floating-input.component.css'],
})
export class AutoCompleteComponent{
  @Input() label?: string;
  @Input() labelClass?: string;
  @Input() options?: { [key: string]: IDropdownItem };
  @Input() name?: string;
  @Input() multiple?: boolean;
  @Input() type?: ColorSchemes;
  @Input() badgeClass?: string;
  @Input() highlightColor?: string;
  @Input() placeholder?: HTMLInputElement['placeholder'];
  @Input() error?: string;
  @Input() values?: Array<string>;
  @Input() disabled?: boolean;
  @Input() id?: string = nanoid();
  @Input() inputClass? = '';

  @Output() focus = new EventEmitter<FocusEvent>();
  @Output() blur= new EventEmitter<FocusEvent>();
  @Output() change = new EventEmitter<Event>();

  @Output() click = new EventEmitter<{key: string, value: IDropdownItem}>();
  @Input() renderDropdownItem?: TemplateRef<any>;

  showClass: boolean = false;
  selectedItems: typeof this.options = {};
  errorText: string = "";

  onItemClick(key: string, value: IDropdownItem) {
    this.click.emit({key, value})
  }

  onChange(event: Event) {
    this.change.emit(event);
  }

  onFocus(event: FocusEvent) {
    this.focus.emit(event);
  }

  onBlur(event: FocusEvent) {
    this.blur.emit(event);
  }
}
