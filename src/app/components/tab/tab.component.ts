import { Component, Input, HostBinding, OnInit, TemplateRef, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { INavItem } from '../navbar-list/navbar-list.component';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
})
export class TabComponent implements OnInit {

  @Input() data!: ITabItem;
  @Input() activeTab: INavItem['title'] = '';
  @Input() dynamicTabs: boolean = false;

  @Output() onTabChange = new EventEmitter<INavItem['title']>
  @Output() onTabClose = new EventEmitter<INavItem>();
  @Output() onAddTab = new EventEmitter<INavItem['title']>();

  @HostBinding('data-test') testId = "TabContainer";

  @HostBinding('class')
  hostClass: string = "h-full w-full flex flex-col"

  navBaristData: Array<INavItem> =[]

  ngOnInit(): void {
    this.activeTab = Object.keys(this.data)[0];
    this.navBaristData = Object.keys(this.data).map(tabItemKey => {
      return {
        title: tabItemKey,
        onClick: (event?: MouseEvent) => {
          this.setActiveTab(tabItemKey);
        },
      }
    })
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
