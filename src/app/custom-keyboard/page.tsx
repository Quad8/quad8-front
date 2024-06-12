import classNames from 'classnames/bind';
import KeyboardViewer from './_components/KeyboardViewer';
import TotalCostWithNavigation from './_components/TotalCostWithNavigation';
import Option from './_components/Option';
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
          <TotalCostWithNavigation />
        </div>
      </div>
    </div>
  );
}
