import { WeightOptionRepository } from './weight-option.repository';
import { writeAuditLog } from '../../shared/utils/audit-log';
import { prisma } from '../../config/db';
import { CreateWeightOptionInput, UpdateWeightOptionInput } from './weight-option.dto';

export class WeightOptionService {
  private repository = new WeightOptionRepository();

  async getAllWeightOptions() {
    return this.repository.findAll();
  }

  async createWeightOption(data: CreateWeightOptionInput) {
    return this.repository.create(data);
  }

  async updateWeightOption(id: string, data: UpdateWeightOptionInput) {
    const option = await this.repository.findById(id);
    if (!option) throw { statusCode: 404, message: 'Weight option not found' };
    return this.repository.update(id, data);
  }

  async deleteWeightOption(id: string, ctx: { actorId?: string | null; ip?: string | null } = {}) {
    const option = await this.repository.findById(id);
    if (!option) throw { statusCode: 404, message: 'Weight option not found' };

    const variantsCount = await this.repository.countVariants(id);
    if (variantsCount > 0) {
      throw { statusCode: 400, message: 'Cannot delete a weight option that is used by products' };
    }

    await this.repository.delete(id);
    await writeAuditLog(prisma, {
      actorId: ctx.actorId,
      action: 'DELETE',
      entity: 'WeightOption',
      entityId: id,
      before: option,
      ip: ctx.ip,
    });
  }
}
