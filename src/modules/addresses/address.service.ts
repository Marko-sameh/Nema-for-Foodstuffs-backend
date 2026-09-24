import { AddressRepository } from './address.repository';
import { CreateAddressInput, UpdateAddressInput } from './address.dto';

export class AddressService {
  private repository = new AddressRepository();

  async getUserAddresses(userId: string) {
    return this.repository.findAllByUserId(userId);
  }

  async createAddress(userId: string, data: CreateAddressInput) {
    // If it's the first address or marked as default, unset others first
    if (data.isDefault) {
      await this.repository.unsetDefaultAddress(userId);
    } else {
      const count = await this.repository.countByUserId(userId);
      if (count === 0) {
        data.isDefault = true;
      }
    }

    return this.repository.create(userId, data);
  }

  async updateAddress(userId: string, addressId: string, data: UpdateAddressInput) {
    const address = await this.repository.findById(addressId);
    if (!address) throw { statusCode: 404, message: 'Address not found' };
    if (address.user_id !== userId) throw { statusCode: 403, message: 'Forbidden' };

    if (data.isDefault && !address.is_default) {
      await this.repository.unsetDefaultAddress(userId);
    }

    return this.repository.update(addressId, data);
  }

  async deleteAddress(userId: string, addressId: string) {
    const address = await this.repository.findById(addressId);
    if (!address) throw { statusCode: 404, message: 'Address not found' };
    if (address.user_id !== userId) throw { statusCode: 403, message: 'Forbidden' };

    const isUsedInOrders = await this.repository.checkAddressUsage(addressId);
    if (isUsedInOrders) {
      throw { statusCode: 400, message: 'Cannot delete an address that is linked to past orders' };
    }

    await this.repository.delete(addressId);
  }

  async setDefaultAddress(userId: string, addressId: string) {
    const address = await this.repository.findById(addressId);
    if (!address) throw { statusCode: 404, message: 'Address not found' };
    if (address.user_id !== userId) throw { statusCode: 403, message: 'Forbidden' };

    await this.repository.unsetDefaultAddress(userId);
    return this.repository.setDefaultAddress(addressId);
  }
}
