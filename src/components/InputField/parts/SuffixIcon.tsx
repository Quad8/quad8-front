import classNames from 'classnames/bind';
import { InputHTMLAttributes } from 'react';
import { ArrowDownIcon, EyeOffIcon, EyeOnIcon, SearchIcon } from '@/public/index';
import styles from './SuffixIcon.module.scss';

const cn = classNames.bind(styles);

interface SuffixIconProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: 'search' | 'eye' | 'arrow';
  onClick?: () => void;
  isOpen?: boolean;
}

export default function SuffixIcon({ type, icon, isOpen, onClick }: SuffixIconProps) {
  const renderIcon = () => {
    if (icon === 'search') {
      return <SearchIcon />;
    }
    if (type === 'password') {
      return <EyeOffIcon />;
    }
    if (icon === 'arrow') {
      return <ArrowDownIcon />;
    }

    return <EyeOnIcon />;
  };

  return (
    <button type="button" className={cn('suffix-icon', { rotate: isOpen })} onClick={onClick}>
      {renderIcon()}
    </button>
  );
}
