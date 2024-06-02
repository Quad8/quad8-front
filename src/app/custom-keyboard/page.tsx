import classNames from 'classnames/bind';
import styles from './customKeyboard.module.scss';
import Option from './_components/Option';
import KeyboardViewer from './_components/KeyboardViewer';
import PriceButton from './_components/PriceButton';

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
