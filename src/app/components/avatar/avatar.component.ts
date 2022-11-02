import { Component, Input, EventEmitter, Output, HostBinding } from '@angular/core';
import { nanoid } from 'nanoid';

@Component({
  selector: 'avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
})
export class AvatarComponent {
  public id: string = "";
  @Input() public name?: string = '';
  @Input() public src?: string = '';
  @Input() public icon?: string = '';
  @Output() public click = new EventEmitter<MouseEvent>();

  constructor() {
    this.id = nanoid();
  }

  generateBackgroundColor() {
    const stringToColour = (str = "") => {
      if (!str) return "inherit";
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      let colour = "#";
      for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        colour += ("00" + value.toString(16)).substr(-2);
      }
      colour += "8D";
      return colour;
    }
    return stringToColour(this.name)
  }

  get shortName() {
    return this.name
      ?.split(" ")
      ?.slice(0, 2)
      ?.map((n) => n[0])
      ?.join("");
  }

  @HostBinding('style.background-color') get bgColor() { return this.generateBackgroundColor() }
  @HostBinding('style.border') get border() { return this.icon ? '1px solid var(--bs-body-color)' : 'none'; }
  @HostBinding('data-test') testId = "Avatar";

  onClick(event: MouseEvent) {
    this.click.emit(event);
  }
};
