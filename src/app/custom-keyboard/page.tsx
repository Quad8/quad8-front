import classNames from 'classnames/bind';
import { cookies } from 'next/headers';

import { getRandomOptionProduct } from '@/api/customKeyboardAPI';
import type { OptionDataType } from '@/types/CustomKeyboardTypes';
import { getBlurImageList } from '@/libs/getBlurImage';

import KeyboardViewer from './_components/canvas/KeyboardViewer';
import TotalCostWithNavigation from './_components/navigator/TotalCostWithNavigation';
import Option from './_components/option/Option';
import styles from './customKeyboard.module.scss';

const cn = classNames.bind(styles);

export default async function Page() {
  const optionAPI: OptionDataType[] = await getRandomOptionProduct();
  const blurImage = await getBlurImageList(optionAPI.map((data) => data.thumbnail));
  const optionData = optionAPI.map((data, i) => ({ ...data, blurImage: blurImage[i] }));
  const accessToken = cookies().get('accessToken')?.value ?? '';

  return (
    <div className={cn('wrapper')}>
      <KeyboardViewer />
      <div className={cn('content-wrapper')}>
        <div className={cn('option-wrapper')}>
          <Option />
        </div>
        <div className={cn('button-wrapper')}>
          <TotalCostWithNavigation optionData={optionData} accessToken={accessToken} />
        </div>
      </div>
    </div>
  );
}
