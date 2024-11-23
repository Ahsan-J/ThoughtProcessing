import { Component, Input, OnInit, Output, EventEmitter, HostBinding } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';

@Component({
    selector: 'navbar-list',
    templateUrl: './navbar-list.component.html',
    standalone: false
})
export class NavbarListComponent implements OnInit {
  @Input() id: string = '';
  @Input() data: Array<INavItem> = [];
  @Input() type: "NavBar" | "Tab" = "NavBar";
  @Input() active?: INavItem['title'];
  @Input() dynamic?: boolean = false;

  @Output() click = new EventEmitter<INavItem['title']>();
  @Output() onAddItem = new EventEmitter<MouseEvent>();
  @Output() onItemClose = new EventEmitter<INavItem>();

  @HostBinding('class')
  hostClass: string = "hidden w-full md:block md:w-auto [&_a]:cursor-pointer"

  faPlusCircle = faPlusCircle;

  ngOnInit(): void {
    this.id = this.id || nanoid();
  }

  onItemClick(item: INavItem, event: MouseEvent) {
    if(item.onClick) return item.onClick(event);
    this.click.emit(item.title)
  }
}

export interface INavItem {
  url?: string;
  title: string;
  onClick?: (event?: MouseEvent) => void;
  dropdownItems?: Array<INavItem>;
}
