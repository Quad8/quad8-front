import classNames from 'classnames/bind';

import { Button, InputField } from '@/components';
import { Input, Label } from '@/components/parts';

import styles from './AddAddressesModal.module.scss';

const cn = classNames.bind(styles);

const PLACEHOLDERS = {
  NAME: '최대 10자로 작성해주세요',
  ADDRESSE1: '주소',
  POSTAL_CODE: '우편번호',
  ADDRESSE2: '상세주소 입력',
  PHONE: '휴대폰 번호 (-없이)를 입력해 주세요',
};

export default function AddAddresseModal() {
  return (
    <form className={cn('modal')}>
      <h1 className={cn('title')}>배송지 등록 / 수정</h1>
      <div className={cn('inputs')}>
        <InputField label='이름' placeholder={PLACEHOLDERS.NAME} />
        <Label className={cn('inputs-addresse')} sizeVariant='md'>
          배송지
          <div className={cn('inputs-search')}>
            <InputField placeholder={PLACEHOLDERS.ADDRESSE1} />
            <Button className={cn('inputs-button')} radius={8} paddingVertical={8}>
              주소검색
            </Button>
          </div>
          <InputField placeholder={PLACEHOLDERS.POSTAL_CODE} />
          <InputField placeholder={PLACEHOLDERS.ADDRESSE2} />
        </Label>
        <InputField label='연락처' placeholder={PLACEHOLDERS.PHONE} />
      </div>
      <Input className={cn('checkbox')} type='checkbox' />
      <Button className={cn('button')} radius={8} paddingVertical={20}>
        저장
      </Button>
    </form>
  );
}
