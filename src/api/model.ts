export interface CardItem {
  id: string;
  title: string;
  description: string;
}

export interface PaginationResponse<T> {
  pageNo: number;
  pageSize: number;
  total?: number;
  list?: T[];
}
