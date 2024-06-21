import classNames from 'classnames/bind';
import styles from './ShopOption.module.scss';

const cn = classNames.bind(styles);

interface ShopOptionProps {
  optionName: string | null;
  count: number;
}

export default function ShopOption({ optionName, count }: ShopOptionProps) {
  return (
    <div className={cn('wrapper')}>
      {optionName && (
        <>
          <div className={cn('option-text')}>{optionName}</div>
          <div className={cn('line')} />
        </>
      )}

      <div className={cn('count-text')}>{count}개</div>
    </div>
  );
}
