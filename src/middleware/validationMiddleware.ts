import { Request, Response, NextFunction } from "express";

// Middleware to check for the API key
export function validateApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  if (!apiKey) {
    return next(new Error("Google Books API key is missing."));
  }
  next();
}

// Middleware to check if the query parameter is present
export function validateQueryParam(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const query = req.params.query;
  if (!query) {
    return next(new Error("Query parameter is missing or empty."));
  }
  next();
}

// Middleware to check if the query parameter is at least five characters long
export function validateQueryLength(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const query = req.params.query;
  if (query.trim().length < 5) {
    return next(new Error("Query must be at least five characters long."));
  }
  next();
}
