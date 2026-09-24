import { CreateWeightOptionInput, UpdateWeightOptionInput } from './weight-option.dto';
export declare class WeightOptionService {
    private repository;
    getAllWeightOptions(): Promise<{
        id: string;
        label: string;
        is_active: boolean;
        value_in_grams: number;
    }[]>;
    createWeightOption(data: CreateWeightOptionInput): Promise<{
        id: string;
        label: string;
        is_active: boolean;
        value_in_grams: number;
    }>;
    updateWeightOption(id: string, data: UpdateWeightOptionInput): Promise<{
        id: string;
        label: string;
        is_active: boolean;
        value_in_grams: number;
    }>;
    deleteWeightOption(id: string, ctx?: {
        actorId?: string | null;
        ip?: string | null;
    }): Promise<void>;
}
//# sourceMappingURL=weight-option.service.d.ts.map