import { prisma } from '../../config/db';

export class PaymentRepository {
  async findOrderByIdAndUser(orderId: string, userId: string) {
    return prisma.order.findFirst({
      where: { id: orderId, user_id: userId },
    });
  }

  async createPayment(data: {
    orderId: string;
    provider: 'COD' | 'STRIPE' | 'PAYMOB';
    amount: number;
    status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
    providerTransactionId?: string;
  }) {
    return prisma.payment.create({
      data: {
        order_id: data.orderId,
        provider: data.provider,
        amount: data.amount,
        status: data.status,
        provider_transaction_id: data.providerTransactionId,
      },
    });
  }

  async updateOrderPaymentStatus(orderId: string, status: 'UNPAID' | 'PAID' | 'REFUNDED') {
    return prisma.order.update({
      where: { id: orderId },
      data: { payment_status: status },
    });
  }

  async findPaymentsByOrderId(orderId: string) {
    return prisma.payment.findMany({
      where: { order_id: orderId },
      orderBy: { paid_at: 'desc' },
    });
  }
}
