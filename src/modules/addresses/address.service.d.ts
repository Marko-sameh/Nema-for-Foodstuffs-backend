import { CreateAddressInput, UpdateAddressInput } from './address.dto';
export declare class AddressService {
    private repository;
    getUserAddresses(userId: string): Promise<{
        id: string;
        phone: string;
        user_id: string;
        label: string;
        full_name: string;
        street: string;
        city: string;
        governorate: string;
        postal_code: string | null;
        is_default: boolean;
    }[]>;
    createAddress(userId: string, data: CreateAddressInput): Promise<{
        id: string;
        phone: string;
        user_id: string;
        label: string;
        full_name: string;
        street: string;
        city: string;
        governorate: string;
        postal_code: string | null;
        is_default: boolean;
    }>;
    updateAddress(userId: string, addressId: string, data: UpdateAddressInput): Promise<{
        id: string;
        phone: string;
        user_id: string;
        label: string;
        full_name: string;
        street: string;
        city: string;
        governorate: string;
        postal_code: string | null;
        is_default: boolean;
    }>;
    deleteAddress(userId: string, addressId: string): Promise<void>;
    setDefaultAddress(userId: string, addressId: string): Promise<{
        id: string;
        phone: string;
        user_id: string;
        label: string;
        full_name: string;
        street: string;
        city: string;
        governorate: string;
        postal_code: string | null;
        is_default: boolean;
    }>;
}
//# sourceMappingURL=address.service.d.ts.map