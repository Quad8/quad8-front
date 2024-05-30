import classNames from 'classnames/bind';
import styles from './customKeyboard.module.scss';
import Canvas from './_components/Canvas';
import Option from './_components/Option';

const cn = classNames.bind(styles);

export default function Page() {
  return (
    <div className={cn('content-wrapper')}>
      <Canvas />
      <div className={cn('option-wrapper')}>
        <Option />
        <div className={cn('button-wrapper')} />
      </div>
    </div>
  );
}
