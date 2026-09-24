import crypto from 'crypto';
import { randomUUID } from 'crypto';
import { env } from '../../config/env';

function sign(uuid: string): string {
  return crypto.createHmac('sha256', env.JWT_SECRET as string).update(uuid).digest('hex');
}

export function generateSignedSessionId(): string {
  const uuid = randomUUID();
  return `${uuid}.${sign(uuid)}`;
}

/**
 * Verifies a signed guest session id of the form `<uuid>.<hmac>`.
 * Returns the sessionId string if valid, or null if missing/forged.
 */
export function verifySignedSessionId(sessionId?: string | null): string | null {
  if (!sessionId || typeof sessionId !== 'string') return null;
  const dotIndex = sessionId.lastIndexOf('.');
  if (dotIndex === -1) return null;

  const uuid = sessionId.slice(0, dotIndex);
  const providedSig = sessionId.slice(dotIndex + 1);
  if (!uuid || !providedSig) return null;

  const expectedSig = sign(uuid);
  const providedBuf = Buffer.from(providedSig);
  const expectedBuf = Buffer.from(expectedSig);
  if (providedBuf.length !== expectedBuf.length) return null;
  if (!crypto.timingSafeEqual(providedBuf, expectedBuf)) return null;

  return sessionId;
}
