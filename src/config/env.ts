import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('1h'),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  FRONTEND_URL: z.string().optional(),
  // Mail integration (no provider wired up yet; see auth.service.ts TODO)
  MAIL_FROM: z.string().optional(),
  MAIL_PROVIDER_API_KEY: z.string().optional(),
  APP_URL: z.string().optional(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  process.exit(1);
}

if (_env.data.NODE_ENV === 'production' && !_env.data.FRONTEND_URL) {
  console.error('❌ FRONTEND_URL must be set in production (comma-separated allow-list for CORS).');
  process.exit(1);
}

export const env = _env.data;
