import { prisma } from '../../config/db';
import { UpdateProfileInput, AdminUpdateUserInput } from './user.dto';

export class UserRepository {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        phone: true,
        role: true,
        is_verified: true,
        created_at: true,
      },
    });
  }

  async findWithPassword(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdateProfileInput) {
    return prisma.user.update({
      where: { id },
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        phone: true,
      },
    });
  }

  async updatePassword(id: string, passwordHash: string) {
    return prisma.user.update({
      where: { id },
      data: { password_hash: passwordHash },
    });
  }

  async findAll(query?: any) {
    const { skip, take } = query || {};
    const [data, total] = await Promise.all([
      prisma.user.findMany({
        select: {
          id: true,
          email: true,
          first_name: true,
          last_name: true,
          role: true,
          created_at: true,
        },
        skip,
        take,
      }),
      prisma.user.count(),
    ]);
    return { data, total };
  }

  async adminUpdate(id: string, data: AdminUpdateUserInput) {
    return prisma.user.update({
      where: { id },
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        role: data.role,
        is_verified: data.is_verified,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        phone: true,
        role: true,
        is_verified: true,
        created_at: true,
      },
    });
  }

  async countAdmins() {
    return prisma.user.count({ where: { role: 'ADMIN' } });
  }

  async countOrdersForUser(userId: string) {
    return prisma.order.count({ where: { user_id: userId } });
  }

  async delete(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  }
}
