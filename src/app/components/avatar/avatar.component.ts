import { Component, Input, EventEmitter, Output, HostBinding } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';

@Component({
  selector: 'avatar',
  templateUrl: './avatar.component.html',
})
export class AvatarComponent {
  public id: string = "";
  @Input() public name?: string = '';
  @Input() public src?: string = '';
  @Input() public icon?: IconDefinition;

  constructor() {
    this.id = nanoid();
  }

  @HostBinding('class')
  get hostClass() {
    return `rounded-full relative h-10 w-10 flex flex-row items-center justify-center overflow-hidden`
  }

  get shortName() {
    return this.name
      ?.split(" ")
      ?.slice(0, 2)
      ?.map((n) => n[0])
      ?.join("");
  }

  @HostBinding('style.background-color') get bgColor() {
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
  // @HostBinding('style.border') get border() { return this.icon ? '1px solid var(--bs-body-color)' : 'none'; }
  // @HostBinding('data-test') testId = "Avatar";
};
