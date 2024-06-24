import { Button } from '@/components';
import classNames from 'classnames/bind';
import styles from './CheckoutComplete.module.scss';

const cn = classNames.bind(styles);

export default function CheckoutCompleted() {
  return (
    <div className={cn('checkout-completed')}>
      <article className={cn('info-box')}>
        <h1 className={cn('info-title')}>
          주문번호<span>12345678</span>
        </h1>
        <div className={cn('info-address')}>
          <div className={cn('address')}>
            <p>오수아</p>
            <p>010-1234-5567</p>
            <p>인천시 서울시 평양시</p>
          </div>
          <Button
            className={cn('address-modification-button')}
            type='button'
            radioGroup='4'
            paddingVertical={8}
            width={72}
          >
            변경
          </Button>
        </div>
        <div>상품 컴포넌트</div>
      </article>

      <div className={cn('confirm-box')}>
        <p>주문 내역을 확인하였으며, 정보 제공등에 동의합니다.</p>
        <Button className={cn('confirm-button')} type='submit'>
          주문 상세보기
        </Button>
      </div>
    </div>
  );
}
