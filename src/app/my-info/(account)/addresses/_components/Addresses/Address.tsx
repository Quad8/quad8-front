import classNames from 'classnames/bind';
import styles from './Address.module.scss';

const cn = classNames.bind(styles);

export default function Address() {
  return (
    <article className={cn('address')}>
      <div className={cn('address-textbox')}>
        <div className={cn('address-namebox')}>
          <h1 className={cn('address-name')}>이름</h1>
          <span>기본배송지</span>
        </div>
        <p>010-1234-1234</p>
        <p>(12345)주소가 보이는 텍스트 위치</p>
      </div>
      <div>
        <button type='button'>수정</button>
        <button type='button'>삭제</button>
      </div>
    </article>
  );
}
