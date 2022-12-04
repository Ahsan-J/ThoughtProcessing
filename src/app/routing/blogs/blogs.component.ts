import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService, IApiParam } from "src/app/shared/api/api.service";
import { generateFilterQuery, Match } from "src/app/shared/sieve";
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

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  async ngOnInit() {

    this.route.queryParamMap.subscribe(async queryParam=> {
      const params: IApiParam = {
        path: 'blog',
      };

      const search = queryParam.get('search');

      if(search) {

        const filters = generateFilterQuery({
          'title|description': Match(search),
        })

        if(filters) {
          params.params = {
            filters
          };
        }

      }
      const response = await this.api.request(params);
      this.blogs = response.data;
      this.meta = response.meta;
    })
  }

  onSort(value: SortingAction['value']) {
    this.activeSort = value;
  }
}
