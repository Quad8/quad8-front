import classNames from 'classnames/bind';

import TotalCheckBoxWrapper from './_components/TotalCheckBoxWrapper';
import TotalCheckBoxCounter from './_components/TotalCheckBoxCounter';
import DeleteButton from './_components/DeleteButton';

import styles from './page.module.scss';

const cn = classNames.bind(styles);

export default function CartPage() {
  return (
    <div className={cn('wrapper')}>
      <div className={cn('title')}>장바구니</div>
      <div className={cn('sub-title-wrapper')}>
        <div className={cn('select-wrapper')}>
          <TotalCheckBoxWrapper type='total' />
          <div className={cn('count-wrapper')}>
            <div className={cn('box-text')}>전체선택</div>
            <TotalCheckBoxCounter type='total' />
          </div>
        </div>
        <DeleteButton>선택 삭제</DeleteButton>
      </div>
      <div className={cn('content-wrapper')}>test</div>
    </div>
  );
}
