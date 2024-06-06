import classNames from 'classnames/bind';
import styles from './ErrorMessage.module.scss';

const cn = classNames.bind(styles);

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <div className={cn('error-message')}>{message}</div>;
}
