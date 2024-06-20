import classNames from 'classnames/bind';

import TotalCheckBox from './_components/TotalCheckBox';
import DeleteButton from './_components/DeleteButton';

import styles from './page.module.scss';
import CustomList from './_components/CustomList';

const cn = classNames.bind(styles);

export default function CartPage() {
  return (
    <div className={cn('wrapper')}>
      <div className={cn('title')}>장바구니</div>
      <div className={cn('sub-title-wrapper')}>
        <TotalCheckBox type='total' />
        <DeleteButton>선택 삭제</DeleteButton>
      </div>
      <div className={cn('content-wrapper')}>
        <div>
          <div className={cn('custom-title-wrapper')}>
            <TotalCheckBox type='custom' />
          </div>
          <CustomList />
        </div>
      </div>
    </div>
  );
}
