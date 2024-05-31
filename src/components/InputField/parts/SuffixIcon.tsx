import classNames from 'classnames/bind';
import { InputHTMLAttributes } from 'react';
import { EyeOffIcon, EyeOnIcon, SearchIcon } from '@/public/index';
import styles from './SuffixIcon.module.scss';

const cn = classNames.bind(styles);

interface SuffixIconProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: 'search' | 'eye';
  onClick?: () => void;
}

export default function SuffixIcon({ type, icon, onClick }: SuffixIconProps) {
  const renderIcon = () => {
    if (icon === 'search') {
      return <SearchIcon />;
    }
    if (type === 'password') {
      return <EyeOffIcon />;
    }

    return <EyeOnIcon />;
  };

  return (
    <button type="button" className={cn('suffix-icon')} onClick={onClick}>
      {renderIcon()}
    </button>
  );
}
