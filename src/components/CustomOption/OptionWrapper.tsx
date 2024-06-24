'use client';

import { ReactNode, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import isTextOverFlow from '@/libs/isTextOverFlow';
import styles from './OptionWrapper.module.scss';

const cn = classNames.bind(styles);

interface OptionWrapperProps {
  optionText: string;
  children: ReactNode;
  wrapperRef?: RefObject<HTMLDivElement>;
  overText?: boolean;
}
export default function OptionWrapper({ optionText, wrapperRef, children, overText }: OptionWrapperProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);

  const updateTooltipPosition = useCallback(() => {
    const [target, tooltip, wraper] = [targetRef.current, tooltipRef.current, wrapperRef?.current];
    if (!target || !tooltip || !wraper) {
      return;
    }
    const { top: targetTop, left: targetLeft } = target.getBoundingClientRect();
    const tooltipHeight = tooltip.clientHeight;
    const viewportHeight = window.innerHeight;

    if (wraper.offsetTop > targetTop) {
      setIsHover(false);
      Object.assign(tooltip.style, { visibility: 'hidden' });
    }

    const isOverFlow = viewportHeight < targetTop + 20 + tooltipHeight;
    const newStyle = isOverFlow
      ? {
          top: 'auto',
          bottom: '10px',
          left: `${targetLeft + target.clientWidth}px`,
          paddingLeft: '4px',
          paddingTop: '0px',
        }
      : {
          top: `${targetTop + 20}px`,
          bottom: 'auto',
          left: `${targetLeft}px`,
          paddingLeft: '0px',
          paddingTop: '4px',
        };
    Object.assign(tooltip.style, newStyle);
  }, [wrapperRef]);

  const handleMouseEnter = () => {
    const isOverFlow = isTextOverFlow(targetRef);
    if (!isOverFlow) {
      return;
    }
    setIsHover(true);
    updateTooltipPosition();
    if (tooltipRef.current) {
      Object.assign(tooltipRef.current.style, { visibility: 'visible' });
    }
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    if (tooltipRef.current) {
      Object.assign(tooltipRef.current.style, { visibility: 'hidden' });
    }
  };

  useEffect(() => {
    updateTooltipPosition();
  }, [updateTooltipPosition]);

  useEffect(() => {
    const ref = wrapperRef?.current;
    if (ref) {
      ref.addEventListener('scroll', updateTooltipPosition);
    }
    return () => {
      if (ref) {
        ref.removeEventListener('scroll', updateTooltipPosition);
      }
    };
  }, [isHover, wrapperRef, updateTooltipPosition]);

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={cn({ relative: !wrapperRef })}>
      <div className={cn('option-text')} ref={targetRef}>
        {optionText}
      </div>
      <div className={cn('tooltip-wrapper', { above: overText, 'is-fixed': wrapperRef })} ref={tooltipRef}>
        {children}
      </div>
    </div>
  );
}
