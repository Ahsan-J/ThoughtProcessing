import { Component, Input, HostBinding, OnInit, TemplateRef, EventEmitter, Output } from '@angular/core';
import { nanoid } from 'nanoid';
import { toKebabCase } from 'src/app/shared/utility';
import { INavItem } from '../navbar-list/navbar-list.component';

@Component({
  selector: 'tab',
  styleUrls: ['./tab.component.css'],
  templateUrl: './tab.component.html',
})
export class TabComponent implements OnInit {

  @Input() data!: ITabItem;
  @Input() activeTab: string | number = '';
  @Input() dynamicTabs: boolean = false;

  @Input()
  @HostBinding('id')
  id: string = '';

  @Output() onTabChange = new EventEmitter<INavItem['id']>
  @Output() onTabClose = new EventEmitter<INavItem>();
  @Output() onAddTab = new EventEmitter<INavItem['id']>();

  @HostBinding('data-test') testId = "TabContainer";

  get navBaristData(): Array<INavItem> {
    return Object.keys(this.data).map(tabItemKey => {
      return {
        title: tabItemKey,
        onClick: () => {
          this.activeTab = tabItemKey;
          this.onTabChange.emit(tabItemKey);
        },
        id: toKebabCase(tabItemKey || ""),
      }
    })
  }

  ngOnInit(): void {
    this.id = this.id || nanoid();
    this.activeTab = Object.keys(this.data)[0];
  }

  onAddNewTab(e: MouseEvent) {
    this.onAddTab.emit(`New Tab ${this.getTabNumber()}`)
  }

  setActiveTab(title: INavItem['title']) {
    this.activeTab = title;
    this.onTabChange.emit(title);
  }

  getTabNumber() {
    let tabIndex = 0;
    while (Object.keys(this.data).includes(`New Tab ${tabIndex}`)) tabIndex++;
    return tabIndex;
  }
};

export type ITabItem = {
  [key in string]: TemplateRef<any>;
}
