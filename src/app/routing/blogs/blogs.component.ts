import { Component, OnInit } from "@angular/core";
import { ApiService, IApiParam } from "src/app/shared/api/api.service";
import { PaginationMeta } from "../../model/app";

type SortingAction= {
  label: string,
  value: number;
}

@Component({
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogListComponent implements OnInit {

  blogs: Array<any> = [];
  meta!: PaginationMeta;

  sorts: Array<SortingAction> = [
    {
      label: "Relative",
      value: 1,
    },
    {
      label: "Latest",
      value: 2,
    },
    {
      label: "Top",
      value: 4,
    },
  ];

  activeSort: SortingAction['value'] = this.sorts[0].value;

  constructor(private api: ApiService) { }

  async ngOnInit() {
    const params: IApiParam = {
      path: 'blog',
    };
    const response = await this.api.request(params);
    this.blogs = response.data;
    this.meta = response.meta;
  }

  onSort(value: SortingAction['value']) {
    this.activeSort = value;
  }
}
