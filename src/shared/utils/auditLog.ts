// Stable, reusable audit-log helper. Other modules rely on this exact signature/path —
// do not change it without coordinating across the codebase.
import { Prisma, PrismaClient } from '@prisma/client';

export interface AuditLogInput {
  actorId?: string | null;
  action: string;
  entity: string;
  entityId: string;
  before?: any;
  after?: any;
  ip?: string | null;
}

type PrismaOrTx = PrismaClient | Prisma.TransactionClient;

/**
 * Writes an audit log entry. This function must never throw - any failure is
 * logged to the console and swallowed so that audit logging can never break
 * the primary business operation it is attached to.
 */
export async function writeAuditLog(prismaOrTx: PrismaOrTx, input: AuditLogInput): Promise<void> {
  try {
    await prismaOrTx.auditLog.create({
      data: {
        actor_id: input.actorId ?? null,
        action: input.action,
        entity: input.entity,
        entity_id: input.entityId,
        before: input.before ?? Prisma.JsonNull,
        after: input.after ?? Prisma.JsonNull,
        ip: input.ip ?? null,
      },
    });
  } catch (error) {
    console.error('Failed to write audit log:', error);
  }
}
