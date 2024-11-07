import { Component, Input,  Output, EventEmitter, HostBinding } from "@angular/core";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ColorSchemes } from "src/app/model/app";

const VariantClasses: { [key in ColorSchemes]: string } = {
  "primary": `bg-primary text-light [&_svg]:fill-light`,
  "secondary": "bg-secondary text-dark [&_svg]:fill-dark",
  "warning": "bg-warning text-dark [&_svg]:fill-dark",
  "success": "bg-success text-light [&_svg]:fill-light",
  "info": "bg-info text-light [&_svg]:fill-light",
  "light": "bg-light text-dark [&_svg]:fill-dark",
  "dark": "bg-dark text-light [&_svg]:fill-light",
  "danger": `bg-danger text-light [&_svg]:fill-light`,
  "link": `text-link hover:underline [&_svg]:fill-link`,
  "link-inverse": `hover:underline [&_svg]:fill-link-inverse`
}

@Component({
  selector: 'badge',
  templateUrl: './badge.component.html',
})
export class BadgeComponent{
  @Input() type?: ColorSchemes = "primary";
  @Input() rounded?: boolean = false;
  @Input() showRemove?: boolean = true;

  @Output() public remove = new EventEmitter<MouseEvent>();

  faXMark = faXmark;

  onRemove = (event: MouseEvent) => {
    event.stopPropagation();
    this.remove.emit(event);
  }

  @HostBinding('class')
  get className(): string {
    const variantClass = VariantClasses[this.type || "primary"]
    return `text-sm p-2 m-1 rounded ${this.rounded ? "rounded-full": ""} ${variantClass}`;
  }
};
