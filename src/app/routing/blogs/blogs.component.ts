import { Component, HostBinding, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService, IApiParam } from "src/app/shared/api/api.service";
import { generateFilterQuery, Match } from "src/app/shared/sieve";
import { PaginationMeta } from "../../model/app";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { sampleBlogs } from "src/app/constant/blog";

type SortingAction = {
  label: string,
  value: number;
}

@Component({
    templateUrl: './blogs.component.html',
    standalone: false
})
export class BlogListComponent implements OnInit {

  @HostBinding('class')
  hostClass: string = "h-full flex flex-col self-center w-3/4";


  faFilter = faFilter;

  blogs = sampleBlogs;
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

  private fetchBlogList() {
    this.route.queryParamMap.subscribe(async queryParam => {
      const params: IApiParam = {
        path: 'blog',
      };

      const search = queryParam.get('search');

      if (search) {
        const filters = generateFilterQuery({ 'title|description': Match(search) })
        if (filters) {
          params.params = { filters };
        }
      }
      const response = await this.api.request(params);
      this.blogs = response.data;
      this.meta = response.meta;
    })
  }

  async ngOnInit() {
    // this.fetchBlogList();
  }

  onSort(value: SortingAction['value']) {
    this.activeSort = value;
  }
}
