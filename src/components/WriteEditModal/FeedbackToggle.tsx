'use clent';

import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './FeedbackToggle.module.scss';

const cn = classNames.bind(styles);

interface FeedbackToggleProps {
  label: string;
  feedbacks: string[];
}

export default function FeedbackToggle({ label, feedbacks }: FeedbackToggleProps) {
  const [clickedFeedback, setClicedFeedback] = useState(0);

  const handleClickFeedback = (i: number) => {
    setClicedFeedback(i);
  };

  return (
    <div className={cn('container')}>
      <h1 id={cn('label')}>{label}</h1>
      <div className={cn('option-wrapper')}>
        {feedbacks.map((feedback, i) => (
          <div
            key={feedback}
            className={cn(i === clickedFeedback ? 'option-clicked' : 'option-not-clicked')}
            onClick={() => handleClickFeedback(i)}
          >
            {feedback}
          </div>
        ))}
      </div>
    </div>
  );
}
