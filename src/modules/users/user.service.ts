import bcrypt from 'bcryptjs';
import { UserRepository } from './user.repository';
import { getPaginationData } from '../../shared/utils/paginate';
import { UpdateProfileInput, UpdatePasswordInput, AdminUpdateUserInput, ListUsersQuery } from './user.dto';
import { writeAuditLog } from '../../shared/utils/audit-log';
import { prisma } from '../../config/db';

export class UserService {
  private repository = new UserRepository();

  async getProfile(userId: string) {
    const user = await this.repository.findById(userId);
    if (!user) throw { statusCode: 404, message: 'User not found' };
    return user;
  }

  async updateProfile(userId: string, data: UpdateProfileInput) {
    return this.repository.update(userId, data);
  }

  async updatePassword(userId: string, data: UpdatePasswordInput) {
    const user = await this.repository.findWithPassword(userId);
    if (!user) throw { statusCode: 404, message: 'User not found' };

    const isPasswordValid = await bcrypt.compare(data.currentPassword, user.password_hash);
    if (!isPasswordValid) throw { statusCode: 400, message: 'Invalid current password' };

    const newPasswordHash = await bcrypt.hash(data.newPassword, 10);
    await this.repository.updatePassword(userId, newPasswordHash);
  }

  async getAllUsers(query: ListUsersQuery) {
    const { skip, take, page, limit } = getPaginationData(query);
    const { data, total } = await this.repository.findAll({ skip, take });
    return { data, total, page, limit };
  }

  async getUserById(id: string) {
    const user = await this.repository.findById(id);
    if (!user) throw { statusCode: 404, message: 'User not found' };
    return user;
  }

  async adminUpdateUser(id: string, data: AdminUpdateUserInput, actorId?: string, ip?: string) {
    const before = await this.repository.findById(id);
    if (!before) throw { statusCode: 404, message: 'User not found' };

    if (data.role && data.role !== before.role && before.role === 'ADMIN') {
      const adminCount = await this.repository.countAdmins();
      if (adminCount <= 1) {
        throw { statusCode: 400, message: 'Cannot remove the last remaining admin' };
      }
    }

    const after = await this.repository.adminUpdate(id, data);

    if (data.role && data.role !== before.role) {
      await writeAuditLog(prisma, {
        actorId: actorId ?? null,
        action: 'user.role_changed',
        entity: 'User',
        entityId: id,
        before: { role: before.role },
        after: { role: after.role },
        ip,
      });
    }

    return after;
  }

  async deleteUser(id: string, actorId?: string, ip?: string) {
    const target = await this.repository.findById(id);
    if (!target) throw { statusCode: 404, message: 'User not found' };

    if (actorId && actorId === id) {
      throw { statusCode: 400, message: 'You cannot delete your own account' };
    }

    if (target.role === 'ADMIN') {
      const adminCount = await this.repository.countAdmins();
      if (adminCount <= 1) {
        throw { statusCode: 400, message: 'Cannot delete the last remaining admin' };
      }
    }

    const orderCount = await this.repository.countOrdersForUser(id);
    if (orderCount > 0) {
      throw { statusCode: 400, message: 'Cannot delete a user that has existing orders' };
    }

    await this.repository.delete(id);

    await writeAuditLog(prisma, {
      actorId: actorId ?? null,
      action: 'user.deleted',
      entity: 'User',
      entityId: id,
      before: { email: target.email, role: target.role },
      ip,
    });
  }
}
