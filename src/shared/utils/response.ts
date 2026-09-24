import { Response } from 'express';

// Recursively convert snake_case keys to camelCase to match frontend expectations
function toCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelCase(v));
  } else if (typeof obj === 'object' && obj !== null && !(obj instanceof Date) && !(obj instanceof RegExp)) {
    return Object.keys(obj).reduce((result, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      result[camelKey] = toCamelCase(obj[key]);
      return result;
    }, {} as any);
  }
  return obj;
}

export const successResponse = (res: Response, statusCode: number, message: string, data?: any) => {
  const safeData = data ? JSON.parse(JSON.stringify(data)) : data;
  return res.status(statusCode).json({
    success: true,
    message,
    data: safeData ? toCamelCase(safeData) : safeData,
  });
};

export const errorResponse = (res: Response, statusCode: number, message: string, errors?: any) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

export const paginatedResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any[],
  total: number,
  page: number,
  limit: number
) => {
  const safeData = data ? JSON.parse(JSON.stringify(data)) : data;
  return res.status(statusCode).json({
    success: true,
    message,
    data: {
      data: toCamelCase(safeData),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    },
  });
};
