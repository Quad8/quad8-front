import { Rating } from '@/components';
import { SpeechBubbleIcon } from '@/public/index';
import type { ProductReviewPreview } from '@/types/ProductReviewTypes';
import classNames from 'classnames/bind';
import KeywordRatios from './KeywordRatios';
import styles from './ReviewPreview.module.scss';
import ScoreGraph from './ScoreGraph';

const cn = classNames.bind(styles);

interface ReviewListPreviewProps {
  previewData: ProductReviewPreview;
}

export default function ReviewPreview({ previewData }: ReviewListPreviewProps) {
  const { averageScore, reviewCounts, reviewStatistics } = previewData;
  const { scoreRatios, ...optionRatios } = reviewStatistics;

  return (
    <div className={cn('preview-section')}>
      <div className={cn('one-section')}>
        <h3 className={cn('title')}>구매 고객 총 평점</h3>
        <Rating rating={averageScore} usage='show' />
        <h1 className={cn('big-text')}>
          {Math.ceil(averageScore * 100) / 100}
          <span className={cn('total-score')}> / 5</span>
        </h1>
      </div>
      <div className={cn('one-section')}>
        <h3 className={cn('title')}>리뷰 수</h3>
        <SpeechBubbleIcon />
        <h1 className={cn('big-text')}>{reviewCounts}</h1>
      </div>
      <div className={cn('one-section')}>
        <h3 className={cn('title')}>평점 비율</h3>
        <ScoreGraph scoreRatios={scoreRatios} />
      </div>
      <div className={cn('one-section')}>
        <h3 className={cn('title')}>다른 구매자들의 평가</h3>
        <KeywordRatios optionRatios={optionRatios} />
      </div>
    </div>
  );
}
