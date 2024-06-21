import { Dropdown, InputField } from '@/components';

const options = [
  '최신순',
  '인기순',
  '낮은가격순',
  '높은가격순',
  '낮은가격순',
  '높은가격순',
  '낮은가격순',
  '높은가격순',
];

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
      <InputField label='생년월일' />
    </div>
  );
}
