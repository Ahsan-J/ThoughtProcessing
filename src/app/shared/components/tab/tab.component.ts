import { Component, Input, HostBinding, OnInit, TemplateRef, EventEmitter, Output } from '@angular/core';
import { INavItem, NavbarListComponent } from '../navbar-list/navbar-list.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html',
    imports: [NavbarListComponent, CommonModule]
})
export class TabComponent implements OnInit {

  @Input() data!: ITabItem;
  @Input() activeTab: INavItem['title'] = '';
  @Input() dynamicTabs = false;

  @Output() tabChange = new EventEmitter<INavItem['title']>
  @Output() tabClose = new EventEmitter<INavItem>();
  @Output() addTab = new EventEmitter<INavItem['title']>();

  @HostBinding('data-test') testId = "TabContainer";

  @HostBinding('class')
  hostClass= "h-full w-full flex flex-col"

  navBaristData: INavItem[] =[]

  ngOnInit(): void {
    this.activeTab = Object.keys(this.data)[0];
    this.navBaristData = Object.keys(this.data).map(tabItemKey => {
      return {
        title: tabItemKey,
        onClick: () => {
          this.setActiveTab(tabItemKey);
        },
      }
    })
  }

  onAddNewTab() {
    this.addTab.emit(`New Tab ${this.getTabNumber()}`)
  }

  setActiveTab(title: INavItem['title']) {
    this.activeTab = title;
    this.tabChange.emit(title);
  }

  getTabNumber() {
    let tabIndex = 0;
    while (Object.keys(this.data).includes(`New Tab ${tabIndex}`)) tabIndex++;
    return tabIndex;
  }
};

export type ITabItem = Record<string, TemplateRef<unknown>>;
