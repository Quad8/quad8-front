import classNames from 'classnames/bind';

import TotalCheckBox from './_components/TotalCheckBox';
import DeleteButton from './_components/DeleteButton';
import CustomCardList from './_components/CustomCardList';
import ShopCardList from './_components/ShopCardList';
import PurchaseButton from './_components/PurchaseButton';
import TotalPrice from './_components/TotalPrice';

import styles from './page.module.scss';

const cn = classNames.bind(styles);

export default async function CartPage() {
  return (
    <div className={cn('wrapper')}>
      <div className={cn('title')}>장바구니</div>
      <div className={cn('sub-title-wrapper')}>
        <TotalCheckBox type='total' />
        <DeleteButton>선택 삭제</DeleteButton>
      </div>
      <div className={cn('content-wrapper')}>
        <div className={cn('product-wrapper')}>
          <div className={cn('product-category-wrapper')}>
            <div className={cn('content-title-wrapper')}>
              <TotalCheckBox type='custom' />
            </div>
            <CustomCardList />
          </div>
          <div className={cn('product-category-wrapper')}>
            <div className={cn('content-title-wrapper')}>
              <TotalCheckBox type='shop' />
            </div>
            <ShopCardList />
          </div>
        </div>
        <div className={cn('price-button-wrapper')}>
          <TotalPrice />
          <PurchaseButton />
        </div>
      </div>
    </div>
  );
}
