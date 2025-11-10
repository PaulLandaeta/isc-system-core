import { Response } from 'express';

interface ErrorResponse {
  error: string;
  code: number;
}

const errorMap: Record<string, ErrorResponse> = {
  AuthenticationError: {
    error: 'Invalid credentials',
    code: 401,
  },
  NotFoundError: { error: 'No data available', code: 404 },
  ValidationError: { error: 'Invalid input data', code: 400 },
  BadRequestError: { error: 'Bad Request', code: 400 },
  ConflictError: { error: 'Resource already exists', code: 409 },
  DefaultError: { error: 'Unexpected error. Please try again later', code: 500 },
};

export const handleError = (res: Response, error: any) => {
  const dynamicStatus = typeof error?.statusCode === 'number' ? error.statusCode : undefined;

  const fallback = errorMap[error?.name] || errorMap['DefaultError'];
  const status = dynamicStatus ?? fallback.code;
  const label = dynamicStatus ? 'HTTP Error' : fallback.error;

  res.status(status).json({
    success: false,
    data: null,
    message: error?.message || 'Unexpected error',
    error: label,
    code: status,
  });
};
