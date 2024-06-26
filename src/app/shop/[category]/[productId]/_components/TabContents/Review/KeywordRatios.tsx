import { CATEGORY_MAP } from '@/constants/product';
import { REVIEW_KEYWORD } from '@/constants/reviewKeyword';
import { getMaxKey } from '@/libs/getMaxKey';
import type { KeywordStatistics } from '@/types/ProductReviewTypes';
import classNames from 'classnames/bind';
import { usePathname } from 'next/navigation';
import styles from './KeywordRatio.module.scss';

const cn = classNames.bind(styles);

interface KeywordRatiosProps {
  optionRatios: KeywordStatistics;
}

export default function KeywordRatios({ optionRatios }: KeywordRatiosProps) {
  const { option1Ratios, option2Ratios, option3Ratios } = optionRatios;
  const pathCategory = usePathname().split('/')[2] as keyof typeof CATEGORY_MAP;
  const category = CATEGORY_MAP[pathCategory];
  const optionList = Object.keys(REVIEW_KEYWORD[category]);
  const optionValueList = Object.values(REVIEW_KEYWORD[category]);

  const maxOptionKeys: number[] = [+getMaxKey(option1Ratios), +getMaxKey(option2Ratios), +getMaxKey(option3Ratios)];
  const maxOptionValues = [
    Math.floor(option1Ratios[maxOptionKeys[0]]),
    Math.floor(option2Ratios[maxOptionKeys[1]]),
    Math.floor(option3Ratios[maxOptionKeys[2]]),
  ];

  return (
    <div className={cn('option-container')}>
      {optionList.map((option, idx) => (
        <div key={option} className={cn('one-option')}>
          <div className={cn('keyword')}>
            <h1>{option}</h1>
          </div>
          <div className={cn('text-container')}>
            <h1 className={cn('keyword-value')}>{optionValueList[idx][maxOptionKeys[idx] - 1]}</h1>
            <hr className={cn('line')} />
            <h1 className={cn('percent')}>{maxOptionValues[idx]}%</h1>
          </div>
        </div>
      ))}
    </div>
  );
}
