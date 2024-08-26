import { Component, HostBinding, Input, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Size } from 'src/app/constant/app';
import { ColorSchemes } from 'src/app/model/app';
import { urlRegex } from 'src/app/shared/api/api.service';

const VariantClasses: { [key in ColorSchemes]: string } = {
  "primary": `bg-primary text-light [&_svg]:fill-light`,
  "secondary": "bg-secondary text-dark [&_svg]:fill-dark",
  "warning": "bg-warning text-dark [&_svg]:fill-dark",
  "success": "bg-success text-light [&_svg]:fill-light",
  "info": "bg-info text-light [&_svg]:fill-light",
  "light": "bg-light text-dark [&_svg]:fill-dark",
  "dark": "bg-dark text-light [&_svg]:fill-light",
  "danger": `bg-danger text-light [&_svg]:fill-light`,
  "link": `bg-ghost text-link hover:underline [&_svg]:fill-link`,
}

const VariantOutlineColors: { [key in ColorSchemes]: string } = {
  "primary": `outline-primary !text-primary`,
  "secondary": "outline-secondary !text-secondary",
  "warning": "outline-warning !text-warning",
  "success": "outline-success !text-success",
  "info": "outline-info !text-info",
  "light": "outline-light !text-light",
  "dark": "outline-dark !text-dark",
  "danger": `outline-danger !text-danger`,
  "link": ``,
}

const SizeClasses: { [key in Size]: string } = {
  [Size.sm]: `text-sm py-0 px-3 h-8`,
  [Size.base]: `text-base py-0 px-4 h-10`,
  [Size.md]: `text-base py-0 px-4 h-10`,
  [Size.lg]: `text-lg py-0 px-4 h-11`,
  [Size.xl]: `text-xl py-0 px-6 h-14`,
  [Size["2xl"]]: `text-2xl py-0 px-6 h-14`,
  [Size["3xl"]]: `text-3xl py-0 px-6 h-14`,
}

const disabledClass = `disabled:bg-neutral-400`

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  @Input() outline?: boolean;
  @Input() type: ColorSchemes = "primary";
  @Input() disabled?: boolean;
  @Input() size?: Size = Size.base;
  @Input() block?: boolean;
  @Input() loader?: boolean;
  @Input() rounded?: boolean;
  @Input() link?: string;
  @Input() htmlType?: "button" | "submit" | "reset" | "link";
  @Input() active?: boolean;
  @Input() leftIcon?: IconDefinition;
  @Input() rightIcon?: IconDefinition;
  @Input() value?: string | number | boolean;

  constructor(private readonly viewRef: ViewContainerRef) { }

  get isLinkButton() {
    return this.type == "link" || !!this.link;
  }

  get linkTarget() {
    return urlRegex.test(this.link || "#") ? "_blank" : undefined;
  }

  @HostBinding("class")
  get btnClass() {
    let type = this.type || "primary";

    let style = `bg-opacity-80 hover:bg-opacity-100 whitespace-nowrap relative flex row items-center justify-center font-primary cursor-pointer no-underline gap-1 rounded-sm transition duration-150 font-medium ${disabledClass}`

    if (this.htmlType == 'link' || this.link) {
      style = `${style} ${VariantClasses['link']} underline !px-0`;
    } else {
      style = `${style} ${VariantClasses[type]}`;
    }

    if (this.outline) {
      style = `${style} ${VariantOutlineColors[type]} outline-1 outline !bg-transparent -outline-offset-1`;
    }

    if (this.size) {
      style = `${style} ${SizeClasses[this.size]}`
    }

    if (this.rounded) {
      style = `${style} rounded-full`;
    }

    return style;
  }
}
