import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { AuthRepository } from './auth.repository';
import { RegisterInput, LoginInput, RefreshTokenInput, ForgotPasswordInput, ResetPasswordInput } from './auth.dto';
import { env } from '../../config/env';
import { CartService } from '../cart/cart.service';

function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export class AuthService {
  private repository = new AuthRepository();
  private cartService = new CartService();

  private generateAccessToken(user: { id: string; role: string }) {
    return jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as any,
      algorithm: 'HS256',
    });
  }

  private async generateRefreshToken(userId: string) {
    const token = crypto.randomBytes(40).toString('hex');
    const tokenHash = hashToken(token);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiration

    await this.repository.saveRefreshToken(userId, tokenHash, expiresAt);
    return token;
  }

  async register(data: RegisterInput) {
    const existingUser = await this.repository.findUserByEmail(data.email);
    if (existingUser) {
      // Do not reveal whether the email is already registered.
      throw { statusCode: 400, message: 'Unable to register with the provided details' };
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await this.repository.createUser(data, passwordHash);

    if (data.sessionId) {
      await this.cartService.mergeGuestCart(data.sessionId, user.id);
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
      },
      tokens: { accessToken, refreshToken },
    };
  }

  async login(data: LoginInput) {
    const user = await this.repository.findUserByEmail(data.email);
    if (!user) {
      throw { statusCode: 401, message: 'Invalid credentials' };
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password_hash);
    if (!isPasswordValid) {
      throw { statusCode: 401, message: 'Invalid credentials' };
    }

    if (data.sessionId) {
      await this.cartService.mergeGuestCart(data.sessionId, user.id);
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
      },
      tokens: { accessToken, refreshToken },
    };
  }

  async refreshToken(data: RefreshTokenInput) {
    if (!data.refreshToken) {
      throw { statusCode: 401, message: 'Invalid refresh token' };
    }

    const tokenHash = hashToken(data.refreshToken);
    const storedToken = await this.repository.findRefreshTokenByHash(tokenHash);

    if (!storedToken) {
      throw { statusCode: 401, message: 'Invalid refresh token' };
    }

    if (storedToken.expires_at < new Date()) {
      await this.repository.deleteRefreshTokenByHash(tokenHash);
      throw { statusCode: 401, message: 'Refresh token expired' };
    }

    // Generate new tokens (Rotate) - one-time use
    await this.repository.deleteRefreshTokenByHash(tokenHash);

    const accessToken = this.generateAccessToken(storedToken.user);
    const newRefreshToken = await this.generateRefreshToken(storedToken.user_id);

    return {
      tokens: { accessToken, refreshToken: newRefreshToken },
    };
  }

  async logout(userId: string) {
    await this.repository.deleteUserRefreshTokens(userId);
  }

  async forgotPassword(data: ForgotPasswordInput) {
    const user = await this.repository.findUserByEmail(data.email);

    // Always behave the same way regardless of whether the user exists,
    // to avoid leaking account existence.
    if (user) {
      const token = crypto.randomBytes(32).toString('hex');
      const tokenHash = hashToken(token);
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await this.repository.createPasswordResetToken(user.id, tokenHash, expiresAt);

      const resetUrl = `${env.FRONTEND_URL ?? 'http://localhost:3000'}/reset-password?token=${token}`;

      // TODO(mail): wire up a real transactional mail provider (e.g. via
      // MAIL_PROVIDER_API_KEY / MAIL_FROM) to actually deliver this link.
      if (env.NODE_ENV !== 'production') {
        console.log(`[password-reset] Reset URL for ${user.email}: ${resetUrl}`);
      }
    }

    return { message: 'If an account with that email exists, a reset link has been sent.' };
  }

  async resetPassword(data: ResetPasswordInput) {
    const tokenHash = hashToken(data.token);
    const resetToken = await this.repository.findPasswordResetTokenByHash(tokenHash);

    if (!resetToken || resetToken.used_at || resetToken.expires_at < new Date()) {
      throw { statusCode: 400, message: 'Invalid or expired reset token' };
    }

    const passwordHash = await bcrypt.hash(data.newPassword, 10);
    await this.repository.updateUserPassword(resetToken.user_id, passwordHash);
    await this.repository.markPasswordResetTokenUsed(resetToken.id);
    await this.repository.deleteUserRefreshTokens(resetToken.user_id);

    return { message: 'Password has been reset successfully' };
  }
}
