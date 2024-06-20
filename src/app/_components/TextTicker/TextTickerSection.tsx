import classNames from 'classnames/bind';
import Marquee from 'react-fast-marquee';
import styles from './TextTickerSection.module.scss';

const cn = classNames.bind(styles);
const TEXT_TICKER = 'KEYDEUK \u00A0\u00A0\u00A0';

export default function TextTickerSection() {
  return (
    <div className={cn('container')}>
      <Marquee autoFill speed={100}>
        {TEXT_TICKER}
      </Marquee>
    </div>
  );
}
