import { prisma } from '../../config/db';

export class SettingsRepository {
  async findAll() {
    return prisma.setting.findMany();
  }

  async findByKey(key: string) {
    return prisma.setting.findUnique({ where: { key } });
  }

  async upsert(key: string, value: string) {
    return prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
}
