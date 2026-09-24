import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { env } from './config/env';
import { prisma } from './config/db';
import routes from './routes';
import { errorHandler } from './shared/middleware/error-handler';
import { apiLimiter } from './shared/middleware/rate-limiter';
import { errorResponse } from './shared/utils/response';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

const app = express();

// We're behind a reverse proxy (e.g. in production/containers); trust the
// first hop so req.ip / req.secure and rate limiting behave correctly.
app.set('trust proxy', 1);

const allowedOrigins = (env.FRONTEND_URL ?? 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

// Always allow the backend's own origin so that Swagger UI can make requests
const backendOrigin = `http://localhost:${env.PORT || 4000}`;
if (!allowedOrigins.includes(backendOrigin)) {
  allowedOrigins.push(backendOrigin);
}

// Middleware
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (no Origin header) and any configured allow-listed origin.
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check - mounted before the rate limiter so it is always reachable
// for load balancer / orchestrator probes.
app.get('/health', async (req, res) => {
  let db: 'up' | 'down' = 'down';
  try {
    await prisma.$queryRaw`SELECT 1`;
    db = 'up';
  } catch (error) {
    db = 'down';
  }

  const status = db === 'up' ? 'ok' : 'degraded';
  res.status(db === 'up' ? 200 : 503).json({
    status,
    uptime: process.uptime(),
    db,
  });
});

// Global Rate Limiter
app.use('/api/v1', apiLimiter);

// Swagger Documentation Route (bypass rate limiter for easy reading)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

// Routes
app.use('/api/v1', routes);

// 404 Handler
app.use((req, res) => {
  errorResponse(res, 404, 'Endpoint not found');
});

// Global Error Handler
app.use(errorHandler);

export default app;
