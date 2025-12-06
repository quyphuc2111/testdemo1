// src/lib/apiResponse.ts
// Response helpers để format response theo đúng spec trong digital-lectures-api.md

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  hasFirstPage: boolean;
  hasLastPage: boolean;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ApiSuccessResponse<T> {
  statusCode: number;
  message: string;
  success: true;
  data: T;
  pagination?: PaginationMeta | null;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  success: false;
  data?: null;
}

/**
 * Tạo success response theo format chuẩn
 */
export function successResponse<T>(
  data: T,
  message: string = "Success",
  statusCode: number = 200,
  pagination: PaginationMeta | null = null
): ApiSuccessResponse<T> {
  return {
    statusCode,
    message,
    success: true,
    data,
    ...(pagination !== undefined && { pagination }),
  };
}

/**
 * Tạo error response theo format chuẩn
 */
export function errorResponse(
  message: string,
  statusCode: number = 500
): ApiErrorResponse {
  return {
    statusCode,
    message,
    success: false,
  };
}

/**
 * Tạo pagination metadata theo spec
 */
export function createPaginationMeta(
  page: number,
  limit: number,
  total: number
): PaginationMeta {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));

  return {
    page: currentPage,
    limit,
    total,
    hasFirstPage: currentPage === 1,
    hasLastPage: currentPage === totalPages || totalPages === 0,
    hasPreviousPage: currentPage > 1,
    hasNextPage: currentPage < totalPages,
  };
}

/**
 * Normalize page và limit parameters
 */
export function normalizePagination(
  pageParam: string | null,
  limitParam: string | null,
  defaultLimit: number = 10,
  maxLimit: number = 100
): { page: number; limit: number } {
  const page = Math.max(1, Number(pageParam) || 1);
  const limit = Math.max(
    1,
    Math.min(Number(limitParam) || defaultLimit, maxLimit)
  );

  return { page, limit };
}
