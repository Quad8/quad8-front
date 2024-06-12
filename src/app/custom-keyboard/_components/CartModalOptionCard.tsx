import classNames from 'classnames/bind';
import Image, { StaticImageData } from 'next/image';
import { MouseEvent, useEffect, useRef, useState } from 'react';
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
  buttonOnClick: (e: MouseEvent<HTMLDivElement>) => void;
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
}: CartModalOptionCardProps) {
  const BUTTON_TYPE = {
    edit: '주문 수정',
    delete: '주문 삭제',
  };
  const tooltipRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (isHover && tooltipRef.current && targetRef.current) {
      const { top: targetTop, left: targetLeft } = targetRef.current.getBoundingClientRect();
      const tooltipHeight = tooltipRef.current.clientHeight;
      const viewportHeight = window.innerHeight;

      if (viewportHeight < targetTop + 20 + tooltipHeight) {
        const NEW_STYLE = {
          top: 'auto',
          bottom: '10px',
          left: `${targetLeft + 296}px`,
          paddingLeft: '4px',
          paddingTop: '0px',
        };
        Object.assign(tooltipRef.current.style, NEW_STYLE);
      } else {
        const NEW_STYLE = {
          top: `${targetTop + 20}px`,
          bottom: 'auto',
          left: `${targetLeft + 40}px`,
          paddingLeft: '0px',
          paddingTop: '4px',
        };
        Object.assign(tooltipRef.current.style, NEW_STYLE);
      }
    }
  }, [isHover]);

  return (
    <div className={cn('wrapper')}>
      <Image src={imageSrc} width={104} height={104} alt='장바구니 이미지' className={cn('image')} />
      <div className={cn('content-wrapper')}>
        <div className={cn('title-option-wrapper')}>
          <div className={cn('title-wrapper')}>
            <p className={cn('title')}>{name}</p>
            <div className={cn('button')} onClick={(e) => buttonOnClick(e)}>
              {BUTTON_TYPE[buttonType]}
            </div>
          </div>
          <div className={cn('option-wrapper')}>
            <div className={cn('option')}>{option1}</div>
            <div
              className={cn('second-option-wrapper')}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <div className={cn('option')} ref={targetRef}>
                {option2}
              </div>
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
