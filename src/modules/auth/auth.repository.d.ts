import { RegisterInput } from './auth.dto';
export declare class AuthRepository {
    findUserByEmail(email: string): Promise<{
        id: string;
        email: string;
        password_hash: string;
        first_name: string;
        last_name: string;
        phone: string | null;
        role: import("@prisma/client").$Enums.Role;
        is_verified: boolean;
        created_at: Date;
        updated_at: Date;
    } | null>;
    createUser(data: RegisterInput, passwordHash: string): Promise<{
        id: string;
        email: string;
        password_hash: string;
        first_name: string;
        last_name: string;
        phone: string | null;
        role: import("@prisma/client").$Enums.Role;
        is_verified: boolean;
        created_at: Date;
        updated_at: Date;
    }>;
    saveRefreshToken(userId: string, tokenHash: string, expiresAt: Date): Promise<{
        id: string;
        created_at: Date;
        user_id: string;
        token_hash: string;
        expires_at: Date;
    }>;
    findRefreshTokenByHash(tokenHash: string): Promise<({
        user: {
            id: string;
            email: string;
            password_hash: string;
            first_name: string;
            last_name: string;
            phone: string | null;
            role: import("@prisma/client").$Enums.Role;
            is_verified: boolean;
            created_at: Date;
            updated_at: Date;
        };
    } & {
        id: string;
        created_at: Date;
        user_id: string;
        token_hash: string;
        expires_at: Date;
    }) | null>;
    deleteRefreshTokenByHash(tokenHash: string): Promise<{
        id: string;
        created_at: Date;
        user_id: string;
        token_hash: string;
        expires_at: Date;
    }>;
    deleteUserRefreshTokens(userId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    createPasswordResetToken(userId: string, tokenHash: string, expiresAt: Date): Promise<{
        id: string;
        created_at: Date;
        user_id: string;
        used_at: Date | null;
        token_hash: string;
        expires_at: Date;
    }>;
    findPasswordResetTokenByHash(tokenHash: string): Promise<({
        user: {
            id: string;
            email: string;
            password_hash: string;
            first_name: string;
            last_name: string;
            phone: string | null;
            role: import("@prisma/client").$Enums.Role;
            is_verified: boolean;
            created_at: Date;
            updated_at: Date;
        };
    } & {
        id: string;
        created_at: Date;
        user_id: string;
        used_at: Date | null;
        token_hash: string;
        expires_at: Date;
    }) | null>;
    markPasswordResetTokenUsed(id: string): Promise<{
        id: string;
        created_at: Date;
        user_id: string;
        used_at: Date | null;
        token_hash: string;
        expires_at: Date;
    }>;
    updateUserPassword(userId: string, passwordHash: string): Promise<{
        id: string;
        email: string;
        password_hash: string;
        first_name: string;
        last_name: string;
        phone: string | null;
        role: import("@prisma/client").$Enums.Role;
        is_verified: boolean;
        created_at: Date;
        updated_at: Date;
    }>;
}
//# sourceMappingURL=auth.repository.d.ts.map