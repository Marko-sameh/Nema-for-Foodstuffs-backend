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
export declare function writeAuditLog(prismaOrTx: PrismaOrTx, input: AuditLogInput): Promise<void>;
export {};
//# sourceMappingURL=auditLog.d.ts.map