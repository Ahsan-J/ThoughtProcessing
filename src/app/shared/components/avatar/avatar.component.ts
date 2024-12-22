import { NgIf } from '@angular/common';
import { Component, Input, HostBinding } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/angular-fontawesome/types';
import { nanoid } from 'nanoid';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    imports: [FaIconComponent, NgIf]
})
export class AvatarComponent {
  public id = "";
  @Input() public name?: string = '';
  @Input() public src?: string = '';
  @Input() public icon?: IconProp;

  constructor() {
    this.id = nanoid();
  }

  @HostBinding('class')
  hostClass = `rounded-full relative h-10 w-10 flex flex-row items-center justify-center overflow-hidden`

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
