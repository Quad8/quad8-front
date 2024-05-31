import Dropdown from '@/components/Dropdown/Dropdown';
import InputField from '@/components/InputField/InputField';

const OPTIONS = ['1', '2', '3', '4', '5', '6'];

export default function Page() {
  return (
    <>
      <InputField
        label="비밀번호"
        id="이메일"
        type="password"
        placeholder="이메일을 입력해 주세요"
        errorMessage="에러메세지"
        hasSuffixIcon="eye"
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Dropdown options={OPTIONS} placeholder="옵션을 선택해 주세요." />
    </>
  );
}
