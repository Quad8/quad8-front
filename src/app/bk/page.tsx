import InputField from '@/components/InputField/InputField';

export default function Page() {
  return (
    <InputField
      label="비밀번호"
      id="이메일"
      type="password"
      placeholder="이메일을 입력해 주세요"
      errorMessage="에러메세지"
      hasSuffixIcon="eye"
    />
  );
}
