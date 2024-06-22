import { Dropdown, InputField } from '@/components';

const options = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

export default function Page() {
  return (
    <div>
      <Dropdown options={options} sizeVariant='xs' />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <InputField label='비밀번호' suffixIcon='eye' />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Dropdown options={options} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* <DatePicker /> */}
    </div>
  );
}
