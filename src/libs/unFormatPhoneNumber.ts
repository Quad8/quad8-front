export const unFormatPhoneNumber = (value: string) => {
  return `010${value.replace(/-/g, '')}`;
};
