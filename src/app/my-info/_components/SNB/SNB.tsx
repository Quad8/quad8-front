import classNames from 'classnames/bind';
import styles from './SNB.module.scss';

const cn = classNames.bind(styles);

const SECTIONS = [
  {
    category: '마이 페이지',
  },
  {
    category: '나의 쇼핑 활동',
    items: ['주문 / 배송 조회', '배송지 관리', '구매 후기', '찜 목록', '장바구니', '쿠폰', '포인트'],
  },
  {
    category: '커뮤티니',
    items: ['내 게시글'],
  },
];

export default function SNB() {
  return (
    <nav className={cn('snb')}>
      {SECTIONS.map((section, i) => (
        <div key={section.category} className={cn('snb-sections', `snb-section-${i + 1}`)}>
          <div className={cn('snb-category')}>{section.category}</div>
          <div className={cn('snb-items')}>
            {section.items?.map((item) => (
              <button type='button' key={item} className={cn('snb-item')}>
                {item}
              </button>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
