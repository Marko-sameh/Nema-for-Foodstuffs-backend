export declare function generateSignedSessionId(): string;
/**
 * Verifies a signed guest session id of the form `<uuid>.<hmac>`.
 * Returns the sessionId string if valid, or null if missing/forged.
 */
export declare function verifySignedSessionId(sessionId?: string | null): string | null;
//# sourceMappingURL=cart.session.d.ts.map