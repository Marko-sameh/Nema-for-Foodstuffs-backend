import { prisma } from '../../config/db';
import { CreateAddressInput, UpdateAddressInput } from './address.dto';

export class AddressRepository {
  async findAllByUserId(userId: string) {
    return prisma.address.findMany({
      where: { user_id: userId },
      orderBy: [{ is_default: 'desc' }, { label: 'asc' }],
    });
  }

  async findById(id: string) {
    return prisma.address.findUnique({
      where: { id },
    });
  }

  async countByUserId(userId: string) {
    return prisma.address.count({
      where: { user_id: userId },
    });
  }

  async create(userId: string, data: CreateAddressInput) {
    return prisma.address.create({
      data: {
        user_id: userId,
        label: data.label,
        full_name: data.fullName,
        phone: data.phone,
        street: data.street,
        city: data.city,
        governorate: data.governorate,
        postal_code: data.postalCode,
        is_default: data.isDefault,
      },
    });
  }

  async update(id: string, data: UpdateAddressInput) {
    return prisma.address.update({
      where: { id },
      data: {
        label: data.label,
        full_name: data.fullName,
        phone: data.phone,
        street: data.street,
        city: data.city,
        governorate: data.governorate,
        postal_code: data.postalCode,
        is_default: data.isDefault,
      },
    });
  }

  async delete(id: string) {
    return prisma.address.delete({
      where: { id },
    });
  }

  async checkAddressUsage(addressId: string) {
    const count = await prisma.order.count({
      where: { address_id: addressId },
    });
    return count > 0;
  }

  async unsetDefaultAddress(userId: string) {
    return prisma.address.updateMany({
      where: { user_id: userId, is_default: true },
      data: { is_default: false },
    });
  }

  async setDefaultAddress(id: string) {
    return prisma.address.update({
      where: { id },
      data: { is_default: true },
    });
  }
}
