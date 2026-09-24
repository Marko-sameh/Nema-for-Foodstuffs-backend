import { Role } from '@prisma/client';
export interface UserProfile {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string | null;
    role: Role;
    is_verified: boolean;
    created_at: Date;
}
export interface UserSummary {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: Role;
}
//# sourceMappingURL=user.types.d.ts.map