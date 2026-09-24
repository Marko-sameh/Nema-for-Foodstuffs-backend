import rateLimit from 'express-rate-limit';
import { errorResponse } from '../utils/response';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  handler: (req, res) => errorResponse(res, 429, 'Too many requests from this IP, please try again after 15 minutes'),
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 requests per `window` (here, per hour)
  handler: (req, res) => errorResponse(res, 429, 'Too many requests from this IP, please try again after an hour'),
  standardHeaders: true,
  legacyHeaders: false,
});

// Reusable strict limiter for sensitive endpoints (password changes, resets, etc.)
// Other modules may import and reuse this.
export const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 requests per `window` (here, per hour)
  handler: (req, res) => errorResponse(res, 429, 'Too many requests from this IP, please try again after an hour'),
  standardHeaders: true,
  legacyHeaders: false,
});
