import { ArrowDownIcon, EyeOffIcon, EyeOnIcon, SearchIcon } from '@/public/index';
import classNames from 'classnames/bind';
import { InputHTMLAttributes } from 'react';
import styles from './SuffixIcon.module.scss';

const cn = classNames.bind(styles);

interface SuffixIconProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: 'search' | 'eye' | 'arrow';
  onClick?: () => void;
  isOpen?: boolean;
}

export default function SuffixIcon({ type, icon, isOpen, onClick }: SuffixIconProps) {
  const renderIcon = () => {
    switch (icon) {
      case 'search':
        return <SearchIcon />;
      case 'arrow':
        return <ArrowDownIcon />;
      default:
        if (type === 'password') {
          return <EyeOffIcon />;
        }

        return <EyeOnIcon />;
    }
  };

  const isArrow = icon === 'arrow';

  return (
    <button type='button' className={cn('suffix-icon', { rotate: isOpen, 'arrow-icon': isArrow })} onClick={onClick}>
      {renderIcon()}
    </button>
  );
}
