import type { ReviewImage } from '@/types/ProductReviewTypes';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './ReviewItem.module.scss';

const cn = classNames.bind(styles);

interface RenderImagesProps {
  reviewImgs: ReviewImage[];
  className: string;
  width: number;
  height: number;
  altPrefix: string;
}

export default function RenderImages({ reviewImgs, className, width, height, altPrefix }: RenderImagesProps) {
  return (
    <>
      {reviewImgs.map((item, idx) => (
        <Image
          key={item.id}
          className={cn(className)}
          src={item.imageUrl}
          width={width}
          height={height}
          alt={`${altPrefix} ${idx + 1}`}
        />
      ))}
    </>
  );
}
