import { RegisterInput, LoginInput, RefreshTokenInput, ForgotPasswordInput, ResetPasswordInput } from './auth.dto';
export declare class AuthService {
    private repository;
    private cartService;
    private generateAccessToken;
    private generateRefreshToken;
    register(data: RegisterInput): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: import("@prisma/client").$Enums.Role;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    login(data: LoginInput): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: import("@prisma/client").$Enums.Role;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    refreshToken(data: RefreshTokenInput): Promise<{
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    logout(userId: string): Promise<void>;
    forgotPassword(data: ForgotPasswordInput): Promise<{
        message: string;
    }>;
    resetPassword(data: ResetPasswordInput): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map