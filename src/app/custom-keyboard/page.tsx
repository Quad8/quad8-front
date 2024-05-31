import classNames from 'classnames/bind';
import styles from './customKeyboard.module.scss';
import Option from './_components/Option';
import KeyboardViewer from './_components/KeyboardViewer';

const cn = classNames.bind(styles);

export default function Page() {
  return (
    <div className={cn('content-wrapper')}>
      <KeyboardViewer />
      <div className={cn('option-wrapper')}>
        <Option />
        <div className={cn('button-wrapper')} />
      </div>
    </div>
  );
}
