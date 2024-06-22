import classNames from 'classnames/bind';

import { Button, Dropdown, InputField } from '@/components';

import styles from './CheckoutForm.module.scss';

const cn = classNames.bind(styles);

const DELIVERY_OPTIONS = ['부재시 문앞에 놓아주세요.', '경비실에 맡겨 주세요', '직접 입력'];

export default function CheckoutForm() {
  return (
    <form className={cn('checkout-form')}>
      <article className={cn('form')}>
        <div>
          <h1>주문 상품</h1>
          <div>상품 컴포넌트</div>
        </div>

        <div>
          <span>총 주문금액</span>
          <span>99,999원</span>
        </div>

        <div>
          <h1>배송 주소</h1>
          <div>
            <div>
              <div>
                <h3>받는분</h3>
                <p>오수야</p>
              </div>
              <div>
                <h3>연락처</h3>
                <p>010-1234-5678</p>
              </div>
              <div>
                <h3>배송 주소</h3>
                <p>서울시 인천시 일산구</p>
              </div>
            </div>
            <Button type='button'>변경</Button>
          </div>
          <Dropdown options={DELIVERY_OPTIONS} />
        </div>

        <div>
          <h1>할인 혜택</h1>
          <div>
            <div>
              <InputField label='쿠폰' />
              <Button type='button'>최대 사용</Button>
            </div>
            <div>
              <InputField label='포인트' />
              <Button type='button'>최대 사용</Button>
            </div>
          </div>
          <div>
            <span>보유 포인트</span>
            <p>0P</p>
          </div>
        </div>

        <div>
          <h1>결제 수단</h1>
          <div>
            <h2>일반 결제</h2>
            <Button type='button'>결제수단들</Button>
          </div>
          <div>
            <span>보유 포인트</span>
            <p>0P</p>
          </div>
        </div>

        <div>
          <h1>결제 상세</h1>
          <div>
            <span>신용카드</span>
            <p>99,999원</p>
          </div>
        </div>
      </article>

      <div>
        <p>주문 내역을 확인하였으며, 정보 제공등에 동의합니다.</p>
        <Button type='submit'>결제하기</Button>
      </div>
    </form>
  );
}
