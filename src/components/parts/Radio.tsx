import { InputHTMLAttributes, forwardRef } from 'react';
import Input from './Input';
import Label from './Label';

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  checked?: boolean;
  isError?: boolean;
}

export default forwardRef<HTMLInputElement, RadioProps>(function Radio({ id, value, checked, isError, ...rest }, ref) {
  return (
    <Label htmlFor={id}>
      <Input ref={ref} id={id} type='radio' value={value} checked={checked} isError={isError} {...rest} />
      {value}
    </Label>
  );
});
