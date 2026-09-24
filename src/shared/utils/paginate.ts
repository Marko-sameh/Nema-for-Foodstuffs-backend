export interface PaginationArgs {
  page?: string | number;
  limit?: string | number;
}

export const getPaginationData = (args: PaginationArgs) => {
  const page = Math.max(1, Number(args.page) || 1);
  const limit = Math.max(1, Number(args.limit) || 20);
  const skip = (page - 1) * limit;

  return { skip, take: limit, page, limit };
};
