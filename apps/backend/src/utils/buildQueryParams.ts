import type { Request } from "express";

interface QueryParams {
	filter?: Record<string, string | string[]>;
	searchTerm?: string;
	searchableFields?: string[]; // You can set this outside
	sort?: string;
	fields?: string[];
	page?: number;
	limit?: number;
}

/**
 * Parse and build query params from Express request query string
 * @param req Express request object
 * @param filterableFields List of fields allowed to be filtered (optional)
 * @returns QueryParams object
 */
export function buildQueryParams(
	req: Request,
	filterableFields?: string[],
): QueryParams {
	const { query } = req;

	// Extract searchTerm if any
	const searchTerm =
		typeof query.searchTerm === "string" ? query.searchTerm : undefined;

	// Extract sort string
	const sort = typeof query.sort === "string" ? query.sort : undefined;

	// Extract fields to select, split by comma
	const fields =
		typeof query.fields === "string"
			? query.fields
					.split(",")
					.map((f) => f.trim())
					.filter(Boolean)
			: undefined;

	// Extract pagination info
	const page = query.page ? parseInt(query.page as string, 10) : undefined;
	const limit = query.limit ? parseInt(query.limit as string, 10) : undefined;

	// Build filter object by picking allowed filterable fields
	let filter: Record<string, string | string[]> = {};

	if (filterableFields) {
		filterableFields.forEach((field) => {
			if (field in query) {
				filter[field] = query[field] as string | string[];
			}
		});
	} else {
		// If no filterableFields specified, allow all query params except known keys
		const excludedKeys = ["searchTerm", "sort", "fields", "page", "limit"];
		filter = Object.keys(query).reduce<Record<string, string | string[]>>((acc, key) => {
			if (!excludedKeys.includes(key)) {
				acc[key] = query[key] as string | string[];
			}
			return acc;
		}, {});
	}

	return {
		filter,
		searchTerm,
		sort,
		fields,
		page,
		limit,
	};
}
