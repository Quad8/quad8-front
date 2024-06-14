'use client';

import { InputField, RadioField } from '@/components';
import Dropdown from '@/components/Dropdown/Dropdown';
import classNames from 'classnames/bind';
import { FormEvent } from 'react';

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import styles from './page.module.scss';

const cn = classNames.bind(styles);

const OPTIONS = ['인기순', '조회순', '최신순', '가격 낮은순', '가격 높은순', '직접 입력'];

export default function Page() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const formData = new FormData(e.currentTarget);
    // const payload = Object.fromEntries(formData.entries());
    // console.log(payload);
  };

  // const handleClick = (e: MouseEvent<HTMLInputElement>) => {
  //   console.log('onClick', true, e.currentTarget.value);
  // };
  const handleClick = () => {};

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label='비밀번호'
        id='이메일'
        name='인풋'
        type='password'
        placeholder='이메일을 입력해 주세요'
        suffixIcon='eye'
        sizeVariant='md'
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div style={{ width: '600px' }}>
        <Dropdown
          options={OPTIONS}
          name='드롭다운'
          sizeVariant='xs'
          placeholder='fdsa'
          onClick={handleClick}
          className={cn('dropdown')}
        />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* <TextField label='텍스트필드' id='텍스트' name='텍스트' placeholder='최소 20자 이상 입력해 주세요' /> */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <RadioField options={OPTIONS} name='숫자' label='숫자' value='6' />
      {/* <ItemOverview /> */}
      <Breadcrumb />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button style={{ border: '1px solid', width: '100%', height: '10vh', textAlign: 'center' }} type='submit'>
        테스트
      </button>
    </form>
  );
}
