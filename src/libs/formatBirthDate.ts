export const formatBirthDate = (value: string): string => {
  const [year, month, day] = value.split('-');
  return `${year} / ${month} / ${day}`;
};

export const formatOnInputBirthChange = (value: string) => {
  const inputValue = value.replace(/\D/g, '');
  let formattedValue = inputValue;

  if (inputValue.length > 4) {
    formattedValue = `${inputValue.slice(0, 4)}/${inputValue.slice(4, 6)}`;
  }
  if (inputValue.length > 6) {
    formattedValue = `${inputValue.slice(0, 4)}/${inputValue.slice(4, 6)}/${inputValue.slice(6, 8)}`;
  }

  return formattedValue;
};

export const unFormatBirthDate = (value: string): string => {
  const [year, month, day] = value.split('/');
  return `${year}-${month}-${day}`;
};
