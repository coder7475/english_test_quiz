// Generic Query interface for query params
export interface QueryParams {
  filter?: Record<string, any>;
  searchTerm?: string;
  searchableFields?: string[];
  sort?: string;
  fields?: string[];
  page?: number;
  limit?: number;
}

// Abstract base class defining the interface
export abstract class AbstractQueryBuilder<T> {
  protected queryParams: QueryParams;

  constructor(queryParams: QueryParams) {
    this.queryParams = queryParams;
  }

  // Apply filtering
  abstract filter(): this;

  // Apply search
  abstract search(): this;

  // Apply sorting
  abstract sort(): this;

  // Select specific fields
  abstract selectFields(): this;

  // Paginate results
  abstract paginate(): this;

  // Execute the query and return results
  abstract exec(): Promise<T[]>;

  // Optionally return metadata about the query (e.g., total count, pages)
  abstract getMeta?(): Promise<Record<string, any>>;
}
