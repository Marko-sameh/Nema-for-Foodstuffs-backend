import { Response } from 'express';
export declare const successResponse: (res: Response, statusCode: number, message: string, data?: any) => Response<any, Record<string, any>>;
export declare const errorResponse: (res: Response, statusCode: number, message: string, errors?: any) => Response<any, Record<string, any>>;
export declare const paginatedResponse: (res: Response, statusCode: number, message: string, data: any[], total: number, page: number, limit: number) => Response<any, Record<string, any>>;
//# sourceMappingURL=response.d.ts.map