import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { nanoid } from 'nanoid';

@Component({
  selector: 'navbar-list',
  templateUrl: './navbar-list.component.html',
  styleUrls: ['./navbar-list.component.css'],

})
export class NavbarListComponent implements OnInit {
  @Input() id: string = '';
  @Input() data: Array<INavItem> = [];
  @Input() type: "NavBar" | "Tab" = "NavBar";
  @Input() active?: INavItem['id'];

  @Output() click = new EventEmitter<INavItem['title']>();
  @Output() onAddItem = new EventEmitter<MouseEvent>();
  @Output() onItemClose = new EventEmitter<INavItem>();

  get typeClass() {
    switch (this.type) {
      case "NavBar":
        return "navbar-nav mr-auto"
      case "Tab":
        return "nav nav-tabs"
      default:
        return ""
    }
  };

  ngOnInit(): void {
    this.id = this.id || nanoid();
  }

  getListClass(item: INavItem) {
    let liClass = "nav-item";
    if (item.dropdownItems) liClass = liClass + " dropdown";
    return liClass.trim();
  }

  onAddNewItem() {

  }
}

export interface INavItem {
  id?: string | number;
  url?: string;
  title: string;
  dropdownItems?: Array<INavItem>;
}
