import { Component, Input, ViewEncapsulation } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Size } from 'src/app/constant/app';
import { ColorSchemes } from 'src/app/model/app';

const VariantClasses: {[key in ColorSchemes]: string} = {
  "primary": `bg-primary text-inverse hover:bg-primary-hover active:bg-primary-active active:transform active:scale-95 [&[data-active="true"]]:bg-primary-active [&[data-active="true"]]:transform [&[data-active="true"]]:scale-95 [&_svg]:fill-inverse`,
  "secondary": "",
  "warning": "",
  "success": "",
  "info": "",
  "light": "",
  "dark": "",
  "danger": `bg-critical text-inverse hover:bg-critical-hover active:bg-critical-active [&[data-active="true"]]:bg-critical-active [&_svg]:fill-inverse`,
  "link": `bg-ghost text-link hover:underline [&_svg]:fill-link`,
}

const SizeClasses: {[key in Size]: string} = {
  [Size.sm]: `text-sm py-0 px-3 h-8`,
  [Size.base]: `text-base py-0 px-4 h-10`,
  [Size.md]: `text-base py-0 px-4 h-10`,
  [Size.lg]: `text-lg py-0 px-4 h-11`,
  [Size.xl]: `text-xl py-0 px-6 h-14`,
  [Size["2xl"]]: `text-2xl py-0 px-6 h-14`,
  [Size["3xl"]]: `text-3xl py-0 px-6 h-14`,
}

const disabledClass = `[&[data-disabled="true"]]:bg-disabled [&[data-disabled="true"]]:text-disabled [&[data-disabled="true"]]:cursor-default [&[data-disabled="true"]]:hover:bg-neutral-highlight-hover [&[data-disabled="true"]]:hover:outline-disabled [&[data-disabled="true"]]:active:outline-disabled [&[data-disabled="true"]]:active:bg-neutral-highlight-active`
const activeClasses = `active:bg-disabled active:text-disabled active:cursor-default active:hover:bg-neutral-highlight-hover active:hover:outline-disabled active:outline-disabled active:bg-neutral-highlight-active [&_svg]:fill-disabled`;
const outlineClass = ``;

// btn btn${this.outline ? "-outline" : ""}-${this.type?.toLowerCase()} ${this.size?.toLowerCase() == "large" ? "btn-lg" : ""} ${this.size?.toLowerCase() == "small" ? "btn-sm" : ""} ${this.block ? "btn-block" : ""} container ${this.disabled ? "disabled" : ""}
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
  @Input() size?: Size = Size.base;
  @Input() block?: boolean;
  @Input() iconName?: IconDefinition;
  @Input() loader?: boolean;
  @Input() rounded?: boolean;
  @Input() link?: string;
  @Input() htmlType?: "button" | "submit" | "reset" | "link";

  get btnClass() {

    let style = `whitespace-nowrap relative flex items-center justify-center font-primary cursor-pointer no-underline gap-1 rounded-full transition duration-150 font-medium -outline-offset-1 outline-1 focus-within:outline-0`

    if (this.type) {
      style = `${style} ${VariantClasses[this.type]}`;
    } else if (this.htmlType== 'link' || this.link) {
      style = `${style} ${VariantClasses['link']} !px-0`;
    } else {
      style = `${style} ${VariantClasses['primary']}`;
    }
    if(this.size) {
      style = `${style} ${SizeClasses[this.size]} ${disabledClass}`
    }
    return style;
  }
}
