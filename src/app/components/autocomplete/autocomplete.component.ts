import { Component, Input, Output, EventEmitter, TemplateRef, OnInit } from "@angular/core";
import { nanoid } from "nanoid";
import { ColorSchemes } from "src/app/model/app";
import { IDropdownItem } from "../dropdown/dropdown.types";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
})
export class AutoCompleteComponent implements OnInit{
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
  @Input() iconName?: IconDefinition;
  @Input() value?: string = '';
  @Input() defaultValue: string = '';
  @Input() renderDropdownItem?: TemplateRef<any>;

  @Output() focus = new EventEmitter<FocusEvent>();
  @Output() blur= new EventEmitter<FocusEvent>();
  @Output() change = new EventEmitter<Event>();
  @Output() keydown = new EventEmitter<KeyboardEvent>();
  @Output() click = new EventEmitter<{key: string, value: IDropdownItem}>();
  @Output() valueChange = new EventEmitter<string>();

  showClass: boolean = false;
  selectedItems: typeof this.options = {};
  errorText: string = "";

  ngOnInit() {
    this.id = this.id || nanoid();
  }

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

  onKeyDown(event: KeyboardEvent) {
    if(event.key == "Enter" && event.target instanceof HTMLInputElement) {
      const value = event.target.value;

      const key = Object.keys(this.options || []).find(k => {
        const option = this.options?.[k]
        return option && option.label.trim().toLowerCase() == value.trim().toLowerCase()
      }) || value.toLowerCase()

      const selectedOption: IDropdownItem = this.options?.[key || ""] || { label: value }

      return this.onItemClick(key, selectedOption)
    }
    this.keydown.emit(event);
  }
}
