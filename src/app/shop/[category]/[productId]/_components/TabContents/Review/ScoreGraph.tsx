import type { OptionRatio } from '@/types/ProductReviewTypes';
import classNames from 'classnames/bind';
import styles from './ScoreGraph.module.scss';

const cn = classNames.bind(styles);

interface ScoreGraphProps {
  scoreRatios: OptionRatio;
}

const SCORE_LIST: string[] = ['5점', '4점', '3점', '2점', '1점'];

export default function ScoreGraph({ scoreRatios }: ScoreGraphProps) {
  return (
    <div className={cn('scores-container')}>
      {SCORE_LIST.map((score, idx) => (
        <div className={cn('one-score')} key={score}>
          <div className={cn('percent-background')}>
            <div className={cn('percent')} style={{ height: `${scoreRatios[5 - idx]}%` }} />
          </div>
          <p className={cn('score-text')}>{score}</p>
        </div>
      ))}
    </div>
  );
}
