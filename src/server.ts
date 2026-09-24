import app from './app';
import { env } from './config/env';
import { prisma, pgPool } from './config/db';

const PORT = env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT} in ${env.NODE_ENV} mode`);
});

let shuttingDown = false;

async function shutdown(signal: string) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`\n${signal} received. Shutting down gracefully...`);

  server.close(async (err) => {
    if (err) {
      console.error('Error while closing HTTP server:', err);
    }

    try {
      await prisma.$disconnect();
    } catch (error) {
      console.error('Error disconnecting Prisma:', error);
    }

    try {
      await pgPool.end();
    } catch (error) {
      console.error('Error closing pg pool:', error);
    }

    console.log('Shutdown complete.');
    process.exit(err ? 1 : 0);
  });

  // Force-exit if graceful shutdown hangs.
  setTimeout(() => {
    console.error('Forcing shutdown after timeout.');
    process.exit(1);
  }, 10000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
