import classNames from 'classnames/bind';
import styles from './ReturnExchangeInfo.module.scss';

const cn = classNames.bind(styles);

export default function ReturnExchangeInfo() {
  return (
    <div>
      <h3 className={cn('main-title')}>반품/교환정보</h3>
      <div className={cn('title-wrap')}>
        키득 반품/교환 안내
        <p className={cn('sub-title')}>
          반품 시 먼저 판매자와 연락하셔서 반품 사유, 택배사, 배송비, 반품지 주소 등을 협의하신 후 반품 상품을 발송해
          주시기 바랍니다.
        </p>
      </div>
      <table className={cn('table')}>
        <colgroup>
          <col width={240} />
          <col width={600} />
          <col width={240} />
          <col width={600} />
        </colgroup>
        <tbody>
          <tr>
            <td className={cn('content-title')}>판매자 지정택배사</td>
            <td colSpan={4}>CJ대한통운</td>
          </tr>
          <tr>
            <td className={cn('content-title')}>반품 배송비</td>
            <td>편도 3,000원 (최초 배송비 무료인 경우 6,000원 부과)</td>
            <td className={cn('content-title')}>교환 배송비</td>
            <td>6,000원</td>
          </tr>
          <tr>
            <td rowSpan={2} className={cn('content-title')}>
              반품/교환 사유에 따른 요청 가능 기간
            </td>
            <td colSpan={3}>
              구매자 단순 변심은 상품 수령 후 7일 이내 <span>(구매자 반품배송비 부담)</span>
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              표시/광고와 상이, 계약 내용과 다르게 이행된 경우 상품 수령 후 3개월 이내 혹은 표시/광고와 다른 사실을 안
              날로 부터 30일 이내<span>(판매자 반품 배송비 부담)</span>
            </td>
          </tr>
          <tr>
            <td rowSpan={8} className={cn('content-title')}>
              반품/교환 불가능 사유
            </td>
            <td colSpan={3}>
              1. 구매자의 단순변심으로 인한 교환/반품 요청이 상품 등을 수령한 날로부터 7일을 경과한 경우
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              2. 구매자의 책임 있는 사유로 상품 등이 멸실 또는 훼손된 경우
              <span>(단, 상품의 내용의 확인하기 위하여 포장 등을 훼손한 경우는 제외)</span>
            </td>
          </tr>
          <tr>
            <td colSpan={3}>3. 구매자의 책임 있는 사유로 포장이 훼손되어 상품 가치가 현저히 상실된 경우</td>
          </tr>
          <tr>
            <td colSpan={3}>4. 시간의 경과에 의하여 재판매가 곤란할 정도로 상품 등의 가치가 현저히 감소한 경우</td>
          </tr>
          <tr>
            <td colSpan={3}>5. 고객의 요청사항에 맞춰 제작에 들어가는 맞춤 제작 상품의 경우</td>
          </tr>
          <tr>
            <td colSpan={3}>6. 복제가 가능한 상품 등의 포장을 훼손한 경우</td>
          </tr>
          <tr>
            <td colSpan={3}>7. 세트 상품 중 일부 상품만 보낸 경우</td>
          </tr>
          <tr>
            <td colSpan={3}>8. 교환/반품 접수 없이 상품을 임의로 반송했을 경우</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
