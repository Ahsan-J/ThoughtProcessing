import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ColorSchemes } from 'src/app/model/app';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  @Input() outline?: boolean;
  @Input() type: ColorSchemes = "primary";
  @Input() disabled?: boolean;
  @Input() size?: "large" | "small" | "normal";
  @Input() block?: boolean;
  @Input() iconName?: string;
  @Input() loader?:boolean;
  @Input() rounded?: boolean;
  @Input() htmlType?: "button" | "submit" | "reset";

  get btnClass() {
    return `btn btn${this.outline ? "-outline" : ""}-${this.type?.toLowerCase()} ${this.size?.toLowerCase() == "large" ? "btn-lg" : ""} ${this.size?.toLowerCase() == "small" ? "btn-sm" : ""} ${this.block ? "btn-block" : ""} container ${this.disabled ? "disabled" : ""}`.trim();
  }
}
