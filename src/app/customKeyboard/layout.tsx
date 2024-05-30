import classNames from 'classnames/bind';
import { StepContextProvider } from '@/context/customKeyboardContext';
import styles from './customKeyboard.module.scss';

const cn = classNames.bind(styles);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn('layout')}>
      <StepContextProvider>
        <div style={{ width: '100%', height: '80px', border: '1px solid black' }}>헤더</div>
        {children}
      </StepContextProvider>
    </div>
  );
}
