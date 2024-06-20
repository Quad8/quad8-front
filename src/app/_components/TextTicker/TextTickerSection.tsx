import classNames from 'classnames/bind';
import Marquee from 'react-fast-marquee';
import styles from './TextTickerSection.module.scss';

const cn = classNames.bind(styles);
const TEXT_TICKER = 'KEYDEUK \u00A0\u00A0\u00A0'; // \u00A0 is the Unicode for a non-breaking space

export default function TextTickerSection() {
  return (
    <div className={cn('container')}>
      <Marquee gradient={false} speed={100}>
        {Array.from({ length: 20 }, () => TEXT_TICKER).join('')}
      </Marquee>
    </div>
  );
}
