export const isNumberAllowedKey = (key: string) => {
  const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'];
  return /[0-9]/.test(key) || allowedKeys.includes(key);
};
