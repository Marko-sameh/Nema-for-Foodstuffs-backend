import { PaymentRepository } from './payment.repository';

export class PaymentService {
  private repository = new PaymentRepository();

  async initiatePayment(orderId: string, userId: string) {
    const order = await this.repository.findOrderByIdAndUser(orderId, userId);

    if (!order) throw { statusCode: 404, message: 'Order not found' };
    if (order.payment_status === 'PAID') throw { statusCode: 400, message: 'Order already paid' };

    // Skeleton logic: If COD, just record a pending payment
    if (order.payment_method === 'COD') {
      const existingPayments = await this.repository.findPaymentsByOrderId(order.id);
      const pendingCod = existingPayments.find((p: any) => p.provider === 'COD' && p.status === 'PENDING');
      
      if (pendingCod) {
        return { message: 'COD payment already initiated', payment: pendingCod };
      }

      const payment = await this.repository.createPayment({
        orderId: order.id,
        provider: 'COD',
        amount: order.total,
        status: 'PENDING',
      });
      return { message: 'COD payment initiated', payment };
    }

    // Skeleton for online payments (Stripe / Paymob to be integrated)
    return { message: 'Online payment initiation skeleton — provider not yet integrated', orderId };
  }

  // TODO: add a signature-verified provider webhook (Stripe/Paymob) here once online payments are integrated.

  async getOrderPayments(orderId: string, userId: string) {
    const order = await this.repository.findOrderByIdAndUser(orderId, userId);
    if (!order) throw { statusCode: 404, message: 'Order not found' };

    return this.repository.findPaymentsByOrderId(orderId);
  }
}

