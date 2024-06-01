'use client';

import Dropdown from '@/components/Dropdown/Dropdown';
import InputField from '@/components/InputField/InputField';
import TextField from '@/components/TextField/TextField';
import { FormEvent } from 'react';

const OPTIONS = ['1', '2', '3', '4', '5', '6'];

export default function Page() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    console.log(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField label="이메일" id="이메일" name="인풋" placeholder="이메일을 입력해 주세요" />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Dropdown options={OPTIONS} name="드롭다운" placeholder="옵션을 선택해 주세요." />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <TextField label="텍스트필드" id="텍스트" name="텍스트" placeholder="최소 20자 이상 입력해 주세요" />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button style={{ border: '1px solid', width: '100%', height: '10vh', textAlign: 'center' }} type="submit">
        테스트
      </button>
    </form>
  );
}
