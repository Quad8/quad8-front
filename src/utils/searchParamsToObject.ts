import { ReadonlyURLSearchParams } from 'next/navigation';

export const searchParamsToObject = (searchParams: ReadonlyURLSearchParams): { [key: string]: string | undefined } => {
  const params: { [key: string]: string | undefined } = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};
