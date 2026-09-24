import { CreateWeightOptionInput, UpdateWeightOptionInput } from './weight-option.dto';
export declare class WeightOptionRepository {
    findAll(): Promise<{
        id: string;
        label: string;
        is_active: boolean;
        value_in_grams: number;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        label: string;
        is_active: boolean;
        value_in_grams: number;
    } | null>;
    create(data: CreateWeightOptionInput): Promise<{
        id: string;
        label: string;
        is_active: boolean;
        value_in_grams: number;
    }>;
    update(id: string, data: UpdateWeightOptionInput): Promise<{
        id: string;
        label: string;
        is_active: boolean;
        value_in_grams: number;
    }>;
    delete(id: string): Promise<{
        id: string;
        label: string;
        is_active: boolean;
        value_in_grams: number;
    }>;
    countVariants(id: string): Promise<number>;
}
//# sourceMappingURL=weight-option.repository.d.ts.map