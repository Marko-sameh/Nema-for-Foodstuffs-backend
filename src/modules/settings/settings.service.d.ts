import { UpdateSettingsInput } from './settings.dto';
export interface ActorContext {
    actorId?: string | null;
    ip?: string | null;
}
export declare class SettingsService {
    private repository;
    getSettings(): Promise<Record<string, string | number>>;
    updateSettings(data: UpdateSettingsInput, ctx?: ActorContext): Promise<Record<string, string | number>>;
    invalidateCache(): void;
}
/**
 * Convenience helper for other modules to read a numeric setting (e.g. shipping_fee)
 * without needing to instantiate SettingsService directly.
 */
export declare function getSettingNumber(key: string, fallback: number): Promise<number>;
//# sourceMappingURL=settings.service.d.ts.map