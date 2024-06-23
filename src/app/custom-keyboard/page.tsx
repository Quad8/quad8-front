import classNames from 'classnames/bind';
import { cookies } from 'next/headers';

import KeyboardViewer from './_components/canvas/KeyboardViewer';
import TotalCostWithNavigation from './_components/navigator/TotalCostWithNavigation';
import Option from './_components/option/Option';

import styles from './customKeyboard.module.scss';

const cn = classNames.bind(styles);

export default async function Page() {
  const accessToken = cookies().get('accessToken')?.value ?? '';

  return (
    <div className={cn('wrapper')}>
      <KeyboardViewer />
      <div className={cn('content-wrapper')}>
        <div id='option' className={cn('option-wrapper')}>
          <Option />
        </div>
        <div className={cn('button-wrapper')}>
          <TotalCostWithNavigation accessToken={accessToken} />
        </div>
      </div>
    </div>
  );
}
