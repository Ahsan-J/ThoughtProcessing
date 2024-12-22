import { Component, HostBinding, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "@/core/services/api/api.service";
// import { generateFilterQuery, Match } from "@/core/utility/sieve.util";
import { PaginationMeta } from "@/core/types/pagination.type";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { ButtonComponent } from "@/shared/components/button/button.component";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { PopularTagsComponent } from "./components/popular-tags/popular-tags.component";
import { ProfileCardComponent } from "./components/profile-card/profile-card.component";
import { BlogListItemComponent } from "./components/blog-list-item/blog-item.component";

interface SortingAction {
  label: string,
  value: number;
}

@Component({
  templateUrl: './blogs.component.html',
  imports: [
    ButtonComponent,
    FaIconComponent,
    PopularTagsComponent,
    ProfileCardComponent,
    BlogListItemComponent,
  ]
})
export class BlogListComponent implements OnInit {

  @HostBinding('class')
  hostClass = "h-full flex flex-col self-center w-3/4";


  faFilter = faFilter;

  blogs = [];
  meta!: PaginationMeta;

  sorts: SortingAction[] = [
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
    // this.route.queryParamMap.subscribe(async queryParam => {
    //   const params: IApiParam = {
    //     path: 'v1/blog',
    //     method: 'GET',
    //   };

    //   const search = queryParam.get('search');

    //   if (search) {
    //     const filters = generateFilterQuery({ 'title|description': Match(search) })
    //     if (filters) {
    //       params.params = { filters };
    //     }
    //   }
    //   const response = await this.api.request(params);
    //   this.blogs = response.data;
    //   this.meta = response.meta;
    // })
  }

  async ngOnInit() {
    this.fetchBlogList();
  }

  onSort(value: SortingAction['value']) {
    this.activeSort = value;
  }
}
