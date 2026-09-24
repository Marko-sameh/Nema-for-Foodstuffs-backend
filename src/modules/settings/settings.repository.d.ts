export declare class SettingsRepository {
    findAll(): Promise<{
        updated_at: Date;
        value: string;
        key: string;
    }[]>;
    findByKey(key: string): Promise<{
        updated_at: Date;
        value: string;
        key: string;
    } | null>;
    upsert(key: string, value: string): Promise<{
        updated_at: Date;
        value: string;
        key: string;
    }>;
}
//# sourceMappingURL=settings.repository.d.ts.map