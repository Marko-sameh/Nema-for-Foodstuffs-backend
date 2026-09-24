import { CreateAddressInput, UpdateAddressInput } from './address.dto';
export declare class AddressRepository {
    findAllByUserId(userId: string): Promise<{
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
    findById(id: string): Promise<{
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
    } | null>;
    countByUserId(userId: string): Promise<number>;
    create(userId: string, data: CreateAddressInput): Promise<{
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
    update(id: string, data: UpdateAddressInput): Promise<{
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
    delete(id: string): Promise<{
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
    checkAddressUsage(addressId: string): Promise<boolean>;
    unsetDefaultAddress(userId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    setDefaultAddress(id: string): Promise<{
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
//# sourceMappingURL=address.repository.d.ts.map