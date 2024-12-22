import { Component, Input, OnInit, Output, EventEmitter, HostBinding } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navbar-list',
    templateUrl: './navbar-list.component.html',
    imports: [ButtonComponent, CommonModule]
})
export class NavbarListComponent implements OnInit {
  @Input() id = '';
  @Input() data: INavItem[] = [];
  @Input() type: "NavBar" | "Tab" = "NavBar";
  @Input() active?: INavItem['title'];
  @Input() dynamic?: boolean = false;

  @Output() clickItem = new EventEmitter<INavItem['title']>();
  @Output() addItem = new EventEmitter<MouseEvent>();
  @Output() itemClose = new EventEmitter<INavItem>();

  @HostBinding('class')
  hostClass = "hidden w-full md:block md:w-auto [&_a]:cursor-pointer"

  faPlusCircle = faPlusCircle;

  ngOnInit(): void {
    this.id = this.id || nanoid();
  }

  onItemClick(item: INavItem, event: MouseEvent) {
    if(item.onClick) return item.onClick(event);
    this.clickItem.emit(item.title)
  }
}

export interface INavItem {
  url?: string;
  title: string;
  onClick?: (event?: MouseEvent) => void;
  dropdownItems?: INavItem[];
}
