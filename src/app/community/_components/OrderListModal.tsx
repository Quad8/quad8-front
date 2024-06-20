import classNames from 'classnames/bind';

import WarningIcon from '@/public/svgs/warning.svg';
import { KeyboardInfoBox, Button } from '@/components';
import type { CustomKeyboardTypes } from '@/types/CustomKeyboardTypes';

import styles from './OrderListModal.module.scss';

const cn = classNames.bind(styles);

interface OrderListModalProps {
  orderList?: CustomKeyboardTypes[];
}

export default function OrderListModal({ orderList }: OrderListModalProps) {
  const buttonText = orderList ? '후기 작성하기' : '커스텀 만들러 가기';

  return (
    <div className={cn('container')}>
      {!orderList ? (
        <div className={cn('no-orderlist-wrapper')}>
          <WarningIcon />
          <h1>커스텀 키보드 구매내역이 없습니다.</h1>
        </div>
      ) : (
        <div>
          <h1 className={cn('title')}>작성할 후기 제품을 선택해주세요.</h1>
          <div className={cn('keyboard-list-wrapper')}>
            {orderList.map((order) => (
              <div key={order.id} className={cn('keyboard-list')}>
                <KeyboardInfoBox keyboardInfo={order} isCustomReview />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className={cn('button-wrapper')}>
        <Button>닫기</Button>
        <Button fontSize={20}>{buttonText}</Button>
      </div>
    </div>
  );
}
