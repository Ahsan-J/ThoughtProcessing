import { Component, Input,  Output, EventEmitter } from "@angular/core";
import { ColorSchemes } from "src/app/model/app";

@Component({
  selector: 'badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css'],
})
export class BadgeComponent{
  @Input() type?: ColorSchemes = "primary";
  @Input() class = "";
  @Input() rounded?: boolean = false;
  @Input() showRemove?: boolean = false;

  @Output() public remove = new EventEmitter<MouseEvent>();

  onRemove = (event: MouseEvent) => {
    this.remove.emit(event);
  }
};
