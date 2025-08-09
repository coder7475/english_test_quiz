import { Query } from "mongoose";

import {
  AbstractQueryBuilder,
  QueryParams,
} from "./../AbstractQueryBuilder.js";

export interface Meta {
  page: number; // Current page number
  limit: number; // Items per page
  totalCount: number; // Total number of matching documents/items
  totalPages: number; // Total pages based on limit
}

export class MongooseQueryBuilder<T> extends AbstractQueryBuilder<T> {
  private mongooseQuery: Query<T[], T>;
  private _meta?: Meta;
  constructor(mongooseQuery: Query<T[], T>, queryParams: QueryParams) {
    super(queryParams);
    this.mongooseQuery = mongooseQuery;
  }

  filter() {
    if (this.queryParams.filter) {
      this.mongooseQuery = this.mongooseQuery.find(this.queryParams.filter);
    }
    return this;
  }

  search() {
    const { searchTerm, searchableFields } = this.queryParams;
    if (searchTerm && searchableFields?.length) {
      const searchQuery = {
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: "i" },
        })),
      };
      this.mongooseQuery = this.mongooseQuery.find(searchQuery);
    }
    return this;
  }

  sort() {
    if (this.queryParams.sort) {
      this.mongooseQuery = this.mongooseQuery.sort(this.queryParams.sort);
    }
    return this;
  }

  selectFields() {
    if (this.queryParams.fields?.length) {
      const fields = this.queryParams.fields.join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    }
    return this;
  }

  paginate() {
    const page = this.queryParams.page ?? 1;
    const limit = this.queryParams.limit ?? 10;
    const skip = (page - 1) * limit;
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    return this;
  }

  build() {
    return this.mongooseQuery;
  }

  async exec(): Promise<T[]> {
    return await this.mongooseQuery.exec();
  }

  async getMeta(): Promise<Meta> {
    if (!this._meta) {
      const count = await this.mongooseQuery.model.countDocuments(
        this.queryParams.filter ?? {},
      );
      const page = this.queryParams.page ?? 1;
      const limit = this.queryParams.limit ?? 10;
      const totalPages = Math.ceil(count / limit);
      this._meta = { page, limit, totalCount: count, totalPages };
    }
    return this._meta;
  }
}

// ? Example Usage
// const queryParams = {
//   filter: { status: "active" },
//   searchTerm: "apple",
//   searchableFields: ["name", "description"],
//   sort: "createdAt desc",
//   fields: ["name", "price"],
//   page: 2,
//   limit: 10,
// };

// // For Mongoose
// const mongooseQuery = Model.find();
// const queryBuilder = new MongooseQueryBuilder(mongooseQuery, queryParams);
// const results = queryBuilder
//   .filter()
//   .search()
//   .sort()
//   .selectFields()
//   .paginate()
//   .build();
// // const result = await results.exec();
// // const meta = await queryBuilder.getMeta();
// // OR
// const [data, meta] = await Promise.all([
//   results.exec(),
//   queryBuilder.getMeta(),
// ]);
// For SQL ORM (e.g. Knex)
// const sqlQuery = knex("products");
// const queryBuilder = new SQLQueryBuilder(sqlQuery, queryParams);
// ...
