import { UpdateProfileInput, UpdatePasswordInput, AdminUpdateUserInput, ListUsersQuery } from './user.dto';
export declare class UserService {
    private repository;
    getProfile(userId: string): Promise<{
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        phone: string | null;
        role: import("@prisma/client").$Enums.Role;
        is_verified: boolean;
        created_at: Date;
    }>;
    updateProfile(userId: string, data: UpdateProfileInput): Promise<{
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        phone: string | null;
    }>;
    updatePassword(userId: string, data: UpdatePasswordInput): Promise<void>;
    getAllUsers(query: ListUsersQuery): Promise<{
        data: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
            role: import("@prisma/client").$Enums.Role;
            created_at: Date;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    getUserById(id: string): Promise<{
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        phone: string | null;
        role: import("@prisma/client").$Enums.Role;
        is_verified: boolean;
        created_at: Date;
    }>;
    adminUpdateUser(id: string, data: AdminUpdateUserInput, actorId?: string, ip?: string): Promise<{
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        phone: string | null;
        role: import("@prisma/client").$Enums.Role;
        is_verified: boolean;
        created_at: Date;
    }>;
    deleteUser(id: string, actorId?: string, ip?: string): Promise<void>;
}
//# sourceMappingURL=user.service.d.ts.map