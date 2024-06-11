import classNames from 'classnames/bind';
import KeyboardViewer from './_components/KeyboardViewer';
import Option from './_components/Option';
import PriceButton from './_components/PriceButton';
import styles from './customKeyboard.module.scss';

const cn = classNames.bind(styles);

export default function Page() {
  return (
    <div className={cn('content-wrapper')}>
      <KeyboardViewer />
      <div className={cn('option-wrapper')}>
        <div className={cn('option-content-wrapper')}>
          <Option />
        </div>
        <div className={cn('button-wrapper')}>
          <PriceButton />
        </div>
      </div>
    </div>
  );
}
