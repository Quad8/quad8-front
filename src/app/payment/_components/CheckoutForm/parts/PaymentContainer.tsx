'use client';

import { ANONYMOUS, loadTossPayments } from '@tosspayments/tosspayments-sdk';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { Button } from '@/components';
import { ROUTER } from '@/constants/route';
import { useUser } from '@/hooks/useUser';
import { renderPaymentProductName } from '@/utils/renderPaymentProductName';
import type { OrderDetailData } from '@/types/orderType';

import styles from './PaymentContainer.module.scss';

const cn = classNames.bind(styles);

interface PaymentContainerProps {
  amountValue: number;
  paymentData?: OrderDetailData;
  isPutPaymentSucceed: boolean;
  hasAddressData: boolean;
}

interface WidgetPaymentMethodWidget {
  on: (eventName: 'paymentMethodSelect', callback: (paymentMethod: { code: string }) => void) => void;
  getSelectedPaymentMethod: () => Promise<{ code: string }>;
  destroy: () => Promise<void>;
}

interface TossPaymentsWidgets {
  setAmount: (amount: { currency: string; value: number }) => Promise<void>;
  renderPaymentMethods: (params: { selector: string; variantKey?: string }) => Promise<WidgetPaymentMethodWidget>;
  renderAgreement: (params: { selector: string; variantKey?: string }) => Promise<void>;
  requestPayment: (params: {
    orderId: string;
    orderName: string;
    customerName?: string;
    customerEmail?: string;
    successUrl: string;
    failUrl: string;
  }) => Promise<void>;
}

export default function PaymentContainer({
  amountValue,
  paymentData,
  isPutPaymentSucceed,
  hasAddressData,
}: PaymentContainerProps) {
  const [ready, setReady] = useState(isPutPaymentSucceed);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);

  const { data: userDataResponse } = useUser();

  const { nickname: customerName, email: customerEmail } = userDataResponse?.data ?? {};

  const { orderId, paymentOrderId, orderItemResponses = [] } = paymentData ?? {};

  const orderName = renderPaymentProductName({ orderItemResponses });

  useEffect(() => {
    const fetchPaymentWidgets = async () => {
      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY as string;
      const tossPayments = await loadTossPayments(clientKey);
      const widgetsInstance = tossPayments.widgets({ customerKey: ANONYMOUS }) as unknown as TossPaymentsWidgets;
      setWidgets(widgetsInstance);
    };

    fetchPaymentWidgets();
  }, []);

  useEffect(() => {
    const renderPaymentWidgets = async () => {
      if (widgets == null) {
        return;
      }

      await widgets.setAmount({
        currency: 'KRW',
        value: amountValue,
      });

      await widgets.renderPaymentMethods({
        selector: '#payment-method',
        variantKey: 'DEFAULT',
      });

      await widgets.renderAgreement({
        selector: '#agreement',
        variantKey: 'AGREEMENT',
      });

      setReady(true);
    };

    renderPaymentWidgets();
  }, [widgets, amountValue]);

  const handlePayment = async () => {
    if (!ready || widgets == null) {
      return;
    }

    try {
      await widgets.requestPayment({
        orderId: paymentOrderId || '',
        orderName,
        customerName: customerName || '',
        customerEmail: customerEmail || '',
        successUrl: `${window.location.origin}${ROUTER.MY_PAGE.CHECKOUT_SUCCESS}?paymentOrderId=${orderId}`,
        failUrl: `${window.location.origin}${ROUTER.MY_PAGE.CHECKOUT_FAIL}`,
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className={cn('container')}>
      <div className={cn('payment')}>
        <div className={cn('payment-method')} id='payment-method' />
        <div className={cn('payment-agreement')} id='agreement' />
        <div className={cn('payment-button-wrap')}>
          <Button className={cn('payment-button')} type='submit' onClick={handlePayment} disabled={!hasAddressData}>
            {hasAddressData ? '결제하기' : '배송지를 확인해 주세요'}
          </Button>
        </div>
      </div>
    </div>
  );
}
