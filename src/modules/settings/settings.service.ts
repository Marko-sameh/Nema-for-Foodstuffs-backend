import { SettingsRepository } from './settings.repository';
import { UpdateSettingsInput } from './settings.dto';
import { writeAuditLog } from '../../shared/utils/auditLog';
import { prisma } from '../../config/db';

export interface ActorContext {
  actorId?: string | null;
  ip?: string | null;
}

// Module-memory cache of the settings map, invalidated on every write.
let settingsCache: Record<string, string | number> | null = null;

export class SettingsService {
  private repository = new SettingsRepository();

  async getSettings() {
    if (settingsCache) return settingsCache;

    const settings = await this.repository.findAll();
    // Convert array of key-value to a single object
    const result: Record<string, string | number> = {};
    for (const setting of settings) {
      // Parse numbers if possible, else keep string
      const numValue = Number(setting.value);
      result[setting.key] = isNaN(numValue) ? setting.value : numValue;
    }

    // Default fallback if not seeded
    if (result['shipping_fee'] === undefined) {
      result['shipping_fee'] = 25;
    }

    settingsCache = result;
    return result;
  }

  async updateSettings(data: UpdateSettingsInput, ctx: ActorContext = {}) {
    const before = await this.getSettings();
    const promises = [];

    if (data.shipping_fee !== undefined) {
      promises.push(
        this.repository.upsert('shipping_fee', data.shipping_fee.toString())
      );
    }

    await Promise.all(promises);
    this.invalidateCache();
    const after = await this.getSettings();

    await writeAuditLog(prisma, {
      actorId: ctx.actorId,
      action: 'UPDATE',
      entity: 'Setting',
      entityId: 'settings',
      before,
      after,
      ip: ctx.ip,
    });

    return after;
  }

  invalidateCache() {
    settingsCache = null;
  }
}

/**
 * Convenience helper for other modules to read a numeric setting (e.g. shipping_fee)
 * without needing to instantiate SettingsService directly.
 */
export async function getSettingNumber(key: string, fallback: number): Promise<number> {
  const service = new SettingsService();
  const settings = await service.getSettings();
  const value = settings[key];
  const numValue = Number(value);
  return value !== undefined && !isNaN(numValue) ? numValue : fallback;
}
