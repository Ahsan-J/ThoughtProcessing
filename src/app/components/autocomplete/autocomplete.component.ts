import { Component, Input, Output, EventEmitter, TemplateRef, OnInit, HostBinding, ChangeDetectorRef, HostListener, ViewContainerRef } from "@angular/core";
import { nanoid } from "nanoid";
import { ColorSchemes } from "src/app/model/app";
import { IDropdownItem } from "../dropdown/dropdown.types";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',

})
export class AutoCompleteComponent implements OnInit {
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
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() change = new EventEmitter<Event>();
  @Output() keydown = new EventEmitter<KeyboardEvent>();
  @Output() itemSelect = new EventEmitter<{ key: string, value: IDropdownItem }>();
  @Output() valueChange = new EventEmitter<string>();

  showClass: boolean = false;
  errorText: string = "";
  searchTerm: string = "";

  constructor(
    private cd: ChangeDetectorRef,
    private readonly viewRef: ViewContainerRef
  ) { }

  @HostBinding('class')
  get className(): string {
    return "relative inline"
  }

  ngOnInit() {
    this.id = this.id || nanoid();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(e: MouseEvent) {
    if (this.viewRef.element.nativeElement instanceof HTMLElement && !this.viewRef.element.nativeElement?.contains(e.target as Node)) {
      this.showClass = false
    }
  }

  onItemClick(event: Event, key: string, value: IDropdownItem) {
    this.itemSelect.emit({ key, value })
    this.showClass = false
  }

  onChange(event: Event) {
    this.change.emit(event);
    this.updateSearchTerm(event);
  }

  onFocus(event: FocusEvent) {
    this.focus.emit(event);
    this.showClass = true;
  }

  onBlur(event: FocusEvent) {
    this.blur.emit(event);
    // this.showClass = false;
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key == "Enter" && event.target instanceof HTMLInputElement) {
      const value = event.target.value;

      const key = Object.keys(this.options || []).find(k => {
        const option = this.options?.[k]
        return option && option.label.trim().toLowerCase() == value.trim().toLowerCase()
      }) || value.toLowerCase()

      const selectedOption: IDropdownItem = this.options?.[key || ""] || { label: value }
      if (key && selectedOption) return this.onItemClick(event, key, selectedOption)
    }

    this.keydown.emit(event);
  }

  updateSearchTerm(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.searchTerm = event.target.value;
      this.cd.detectChanges()
    }
  }

  get dropdownContentClass(): string {
    return `absolute bg-light dark:bg-dark w-full overflow-auto shadow z-10 p-0 max-h-[15rem] ${this.showClass ? "block" : "hidden"}`;
  }

}
