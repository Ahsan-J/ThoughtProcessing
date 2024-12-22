export interface PaginationQuery {
  page: string | number;
  pageSize: string | number;
}

export interface PaginationMeta {
  total: number;
  page_size: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
}

export type ColorSchemes = "primary" | "secondary" | "danger" | "warning" | "success" | "info" | "link" | "light" | "dark" | "link-inverse";
