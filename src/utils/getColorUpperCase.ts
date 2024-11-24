import { Color } from '@react-three/fiber';

export const getColorUpperCase = (value: Color) => {
  const upperCaseColor = value.toString().toUpperCase();
  return upperCaseColor;
};
