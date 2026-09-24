export interface PaginationArgs {
    page?: string | number;
    limit?: string | number;
}
export declare const getPaginationData: (args: PaginationArgs) => {
    skip: number;
    take: number;
    page: number;
    limit: number;
};
//# sourceMappingURL=paginate.d.ts.map