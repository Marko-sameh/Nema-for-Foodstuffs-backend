import { UpdateProfileInput, AdminUpdateUserInput } from './user.dto';
export declare class UserRepository {
    findById(id: string): Promise<{
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        phone: string | null;
        role: import("@prisma/client").$Enums.Role;
        is_verified: boolean;
        created_at: Date;
    } | null>;
    findWithPassword(id: string): Promise<{
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
    update(id: string, data: UpdateProfileInput): Promise<{
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        phone: string | null;
    }>;
    updatePassword(id: string, passwordHash: string): Promise<{
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
    findAll(query?: any): Promise<{
        data: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            role: import("@prisma/client").$Enums.Role;
            created_at: Date;
        }[];
        total: number;
    }>;
    adminUpdate(id: string, data: AdminUpdateUserInput): Promise<{
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        phone: string | null;
        role: import("@prisma/client").$Enums.Role;
        is_verified: boolean;
        created_at: Date;
    }>;
    countAdmins(): Promise<number>;
    countOrdersForUser(userId: string): Promise<number>;
    delete(id: string): Promise<{
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
//# sourceMappingURL=user.repository.d.ts.map