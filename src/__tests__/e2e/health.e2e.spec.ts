import request from 'supertest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import app from '@/app';
import { prisma } from '@/config/db';

// Mock Prisma so our E2E test doesn't require a real database connection
vi.mock('@/config/db', () => ({
  prisma: {
    $queryRaw: vi.fn(),
  },
}));

describe('E2E: Health Check API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GET /health - should return 200 OK when Database is up', async () => {
    // Simulate a successful DB connection query
    vi.mocked(prisma.$queryRaw).mockResolvedValue([{ '?column?': 1 }] as any);

    const response = await request(app).get('/health');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'ok',
      uptime: expect.any(Number),
      db: 'up',
    });
    expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
  });

  it('GET /health - should return 503 when Database is down', async () => {
    // Simulate a DB connection failure
    vi.mocked(prisma.$queryRaw).mockRejectedValue(new Error('Connection failed'));

    const response = await request(app).get('/health');
    
    expect(response.status).toBe(503);
    expect(response.body).toEqual({
      status: 'degraded',
      uptime: expect.any(Number),
      db: 'down',
    });
    expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
  });
});
