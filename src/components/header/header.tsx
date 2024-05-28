import classNames from 'classnames/bind';
import styles from './header.module.scss';

export default function Header() {
  const cn = classNames.bind(styles);

  return (
    <div className={cn('wrapper')}>
      <div className={cn('right-wrapper')}>
        <div>로고</div>
        <div className={cn('button-wrapper')}>
          <div>커스텀 키보드 만들기</div>
          <div>shop</div>
          <div>커뮤니티</div>
        </div>
      </div>
      <div className={cn('left-wrapper')}>
        <div>검색창</div>
        <div className={cn('status-wrapper')}>
          <div>로그인</div>
          <div>마이페이지</div>
          <div>장바구니</div>
        </div>
      </div>
    </div>
  );
}
