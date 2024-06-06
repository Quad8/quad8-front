import classNames from 'classnames/bind';
import WarningIcon from '@/public/svgs/warning.svg';
import Button from '@/components/Button/Button';
import styles from './OrderListModal.module.scss';

const cn = classNames.bind(styles);

interface OrderListModalProps {
  orderList?: string[];
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
      ) : null}
      <div className={cn('button-wrapper')}>
        <Button>닫기</Button>
        <Button fontSize={20}>{buttonText}</Button>
      </div>
    </div>
  );
}
