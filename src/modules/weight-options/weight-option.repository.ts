import { prisma } from '../../config/db';
import { CreateWeightOptionInput, UpdateWeightOptionInput } from './weight-option.dto';

export class WeightOptionRepository {
  async findAll() {
    return prisma.weightOption.findMany({
      orderBy: { value_in_grams: 'asc' },
    });
  }

  async findById(id: string) {
    return prisma.weightOption.findUnique({
      where: { id },
    });
  }

  async create(data: CreateWeightOptionInput) {
    return prisma.weightOption.create({
      data: {
        label: data.label,
        value_in_grams: data.valueInGrams,
        is_active: data.isActive,
      },
    });
  }

  async update(id: string, data: UpdateWeightOptionInput) {
    return prisma.weightOption.update({
      where: { id },
      data: {
        label: data.label,
        value_in_grams: data.valueInGrams,
        is_active: data.isActive,
      },
    });
  }

  async delete(id: string) {
    return prisma.weightOption.delete({
      where: { id },
    });
  }

  async countVariants(id: string) {
    return prisma.productWeightVariant.count({ where: { weight_option_id: id } });
  }
}
