import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { errorCatalog, ErrorTypes } from '../errors/catalogErrors';

const errorHandler /* : ErrorRequestHandler  */ = (
  error: Error | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof ZodError) return res.status(400).json({ message: error.issues });
  const createdError = errorCatalog[error.message as ErrorTypes];
  if (createdError) {
    return res.status(createdError.status).json({ error: createdError.message });
  }

  console.error(error);
  return res.status(500).json({ message: 'internal error' });
};

export default errorHandler;
