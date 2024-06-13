import classNames from 'classnames/bind';
import Image, { StaticImageData } from 'next/image';
import { MouseEvent, useRef, useState, useEffect, RefObject, useCallback } from 'react';
import { Button } from '@/components';
import styles from './CartModalOptionCard.module.scss';

const cn = classNames.bind(styles);

interface CartModalOptionCardProps {
  name: string;
  option1: string;
  option2?: string;
  buttonType: 'edit' | 'delete';
  count?: number;
  price: number;
  imageSrc: string | StaticImageData;
  buttonOnClick: (e: MouseEvent<HTMLButtonElement>) => void;
  wrapperRef?: RefObject<HTMLDivElement>;
}

export default function CartModalOptionCard({
  name,
  option1,
  option2,
  buttonType,
  count,
  price,
  imageSrc,
  buttonOnClick,
  wrapperRef,
}: CartModalOptionCardProps) {
  const BUTTON_TYPE = {
    edit: '주문 수정',
    delete: '주문 삭제',
  };
  const tooltipRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    if (targetRef.current && targetRef.current.offsetWidth !== targetRef.current.scrollWidth) {
      setIsHover(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const updateTooltipPosition = useCallback(() => {
    /* 
      wrapper보다 target(옵션 텍스트)이 높은 경우, isHover 비활성화(툴팁 안 보이게 하기)
      전체 화면 높이에 대해서, 현재 target(옵션 텍스트)의 top 위치 + tooltip의 높이의 값이 전체 화면 보다 큰 경우(tooltip이 커서 화면을 벗어나는 경우), bottom 10으로 위치 고정
      이외에는 target(옵션 텍스트)top 위치의 아래에(글자 높이 더하기) 위치시키기.
      => hover시점에 위치 업데이트 + 스크롤 이벤트 발생했을 때 위치 업데이트(wrapper의 scroll 이벤트에 등록)
    */
    const tooltip = tooltipRef.current;
    const target = targetRef.current;
    const wrapper = wrapperRef?.current;

    if (!isHover || !tooltip || !target || !wrapper) {
      return;
    }

    const { top: targetTop, left: targetLeft } = target.getBoundingClientRect();
    const tooltipHeight = tooltip.clientHeight;
    const viewportHeight = window.innerHeight;

    if (wrapper.offsetTop > targetTop) {
      setIsHover(false);
      return;
    }

    if (viewportHeight < targetTop + 20 + tooltipHeight) {
      const newStyle = {
        top: 'auto',
        bottom: '10px',
        left: `${targetLeft + 296}px`,
        paddingLeft: '4px',
        paddingTop: '0px',
      };
      Object.assign(tooltip.style, newStyle);
      return;
    }
    const newStyle = {
      top: `${targetTop + 20}px`,
      bottom: 'auto',
      left: `${targetLeft + 40}px`,
      paddingLeft: '0px',
      paddingTop: '4px',
    };
    Object.assign(tooltipRef.current.style, newStyle);
  }, [isHover, wrapperRef]);

  useEffect(() => {
    if (isHover) {
      updateTooltipPosition();
    }
  }, [isHover, updateTooltipPosition]);

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
    <div className={cn('wrapper')}>
      <Image src={imageSrc} width={104} height={104} alt='장바구니 이미지' className={cn('image')} />
      <div className={cn('content-wrapper')}>
        <div className={cn('title-option-wrapper')}>
          <div className={cn('title-wrapper')}>
            <p className={cn('title')}>{name}</p>
            <Button
              width={72}
              fontSize={14}
              className={cn('button')}
              onClick={(e: MouseEvent<HTMLButtonElement>) => buttonOnClick(e)}
            >
              {BUTTON_TYPE[buttonType]}
            </Button>
          </div>
          <div className={cn('option-wrapper')}>
            <div className={cn('option')}>{option1}</div>
            <div
              className={cn('second-option-wrapper')}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <p className={cn('option')} ref={targetRef}>
                {option2}
              </p>
              <div className={cn('tooltip-wrapper', { 'tooltip-visible': isHover })} ref={tooltipRef}>
                <div className={cn('tooltip')}>{option2}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={cn('count-price-wrapper')}>
          {count ? <div className={cn('count')}>{count}개</div> : <div />}
          <div className={cn('price')}>{price.toLocaleString()}원</div>
        </div>
      </div>
    </div>
  );
}
