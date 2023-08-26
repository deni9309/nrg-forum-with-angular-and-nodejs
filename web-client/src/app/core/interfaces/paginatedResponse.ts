export interface PaginatedResponse<T> {
    results: T[];
    totalResultsCount: number;
}
