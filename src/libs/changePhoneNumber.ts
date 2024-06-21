export const changePhoneNumber = (value: string) => {
  let changeValue = value.replace(/[^0-9]/g, '');

  if (changeValue.length > 8) {
    changeValue = changeValue.slice(0, 8);
  }

  if (changeValue.length > 4) {
    changeValue = changeValue.replace(/(\d{4})(\d+)/, '$1-$2');
  }

  return changeValue;
};
