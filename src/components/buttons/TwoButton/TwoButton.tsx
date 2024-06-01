import classNames from 'classnames/bind';
import styles from './TwoButton.module.scss';

interface TwoButtonProps {
  leftText: string;
  leftOnClickHandler: () => void;
  rightText: string;
  rightOnClickHandler: () => void;
}

export default function TwoButton({ leftText, leftOnClickHandler, rightText, rightOnClickHandler }: TwoButtonProps) {
  const cn = classNames.bind(styles);
  return (
    <div className={cn('buttons-div')}>
      <button className={cn('button-div')} onClick={leftOnClickHandler} type='button'>
        {leftText}
      </button>
      <button className={cn('button-div')} onClick={rightOnClickHandler} type='button'>
        {rightText}
      </button>
    </div>
  );
}
